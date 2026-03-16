import { Component, OnInit } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';
import { AnalyticsService } from '../../core/services/analytics.service';
import { LABS_ENTRIES } from './labs.data';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

export type LabsEntryType = 'post' | 'snippet' | 'gist' | 'brief' | 'program';

export interface LabsEntry {
  id: number;
  title: string;
  date: string;
  category: string;
  type: LabsEntryType;
  url?: string;
  description?: string;
}

export interface DisplayNode {
  id: string;
  type: 'category' | 'post';
  label: string;
  entry?: LabsEntry;
  tabClass: string;
}

@Component({
  selector: 'app-labs',
  imports: [NgClass, UpperCasePipe, MarkdownPipe, SafeHtmlPipe],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent implements OnInit {
  expandedEntries = new Set<number>();

  entries: LabsEntry[] = LABS_ENTRIES;

  get displayNodes(): DisplayNode[] {
    const nodes: DisplayNode[] = [];
    const categories = [...new Set(this.entries.map((e) => e.category))];
    let tabIndex = 0;

    // Instead of absolute positioning that overflows mobile, use flex distributions.
    // Anchoring to edges using flex 'justify-start/end' prevents off-screen tabs.
    const positions = [
      'justify-start pl-2 sm:pl-8', // Far left
      'justify-start pl-[8%] sm:pl-[20%]', // Mid left (anchored left)
      'justify-start pl-[15%] sm:pl-[28%]', // Mid left
      'justify-start pl-[20%] sm:pl-[32%]', // Center (anchored center)
      'justify-end pr-[20%] sm:pr-[32%]', // Center (anchored center)
      'justify-end pr-[15%] sm:pr-[28%]', // Mid right (anchored right)
      'justify-end pr-[8%] sm:pr-[20%]', // Mid right
      'justify-end pr-2 sm:pr-8', // Far right
    ];

    categories.forEach((category) => {
      // Category Node (Black tab) goes FIRST (appearing "behind/above" the posts)
      nodes.push({
        id: `cat-${category}`,
        type: 'category',
        label: category,
        tabClass: positions[tabIndex % positions.length],
      });
      tabIndex++;

      // Post Nodes (White tabs) under this category go LAST (appearing "in front/below" the category)
      const catEntries = this.entries
        .filter((e) => e.category === category)
        .sort((a, b) => b.id - a.id);

      catEntries.forEach((entry) => {
        nodes.push({
          id: `post-${entry.id}`,
          type: 'post',
          label: entry.title,
          entry: entry,
          tabClass: positions[tabIndex % positions.length],
        });
        tabIndex++;
      });
    });

    return nodes;
  }

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Labs',
      page_location: '/labs',
    });
  }

  handleEntryClick(entry: LabsEntry) {
    if (entry.url) {
      this.analyticsService.trackOutboundLink(entry.url, entry.title);
      window.open(entry.url, '_blank');
    } else {
      this.toggleExpand(entry.id);
    }
  }

  handleNodeClick(node: DisplayNode) {
    if (node.type === 'post' && node.entry) {
      this.handleEntryClick(node.entry);
    }
  }

  toggleExpand(id: number) {
    if (this.expandedEntries.has(id)) {
      this.expandedEntries.delete(id);
    } else {
      this.expandedEntries.add(id);
    }
  }

  isExpanded(id: number): boolean {
    return this.expandedEntries.has(id);
  }

  formatId(id: number): string {
    return id.toString().padStart(3, '0');
  }
}
