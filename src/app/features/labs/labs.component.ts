import { Component, OnInit } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';
import { AnalyticsService } from '../../core/services/analytics.service';

export type LabsEntryType = 'post' | 'snippet' | 'gist' | 'thought' | 'program';

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
  imports: [NgClass, UpperCasePipe],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent implements OnInit {
  expandedEntries = new Set<number>();

  entries: LabsEntry[] = [
    {
      id: 1,
      title: 'i built a website',
      date: '2024.11',
      category: 'Projects',
      type: 'post',
      url: 'https://anshdawda.notion.site/I-Built-a-Website-18f579a2cd4080ec8ac7cafe94aae790',
    },
    {
      id: 2,
      title: 'What are Embeddings?',
      date: '2025.01',
      category: 'AI Concepts',
      type: 'thought',
      description:
        'A deep dive into what embeddings are, why they matter, and how they power modern AI systems from search to generation.',
    },
    {
      id: 3,
      title: 'Transformers without Normalization!?',
      date: '2025.02',
      category: 'AI Concepts',
      type: 'post',
      url: 'https://anshdawda.notion.site/Transformers-without-Normalization-1c6579a2cd4080bba1aafe450db478c2',
    },
    {
      id: 4,
      title: 'Hmmm... Cache- or Retrieval-AG',
      date: '2025.03',
      category: 'AI Architecture',
      type: 'post',
      url: 'https://anshdawda.notion.site/Hmmm-Cache-or-Retrieval-AG-1c6579a2cd4080419d5ce7267336704d',
    },
    {
      id: 5,
      title: 'fonts, fonts, fonts',
      date: '2025.04',
      category: 'Design',
      type: 'thought',
      url: 'https://anshdawda.notion.site/Fonts-Fonts-Fonts-19b579a2cd4080f69b19c769139828af',
    },
  ];

  get displayNodes(): DisplayNode[] {
    const nodes: DisplayNode[] = [];
    const categories = [...new Set(this.entries.map((e) => e.category))];
    let tabIndex = 0;
    
    // Instead of absolute positioning that overflows mobile, use flex distributions.
    // Anchoring to edges using flex 'justify-start/end' prevents off-screen tabs.
    const positions = [
      'justify-start pl-2 sm:pl-8',           // Far left
      'justify-start pl-[15%] sm:pl-[28%]',   // Mid left
      'justify-end pr-[15%] sm:pr-[28%]',     // Mid right (anchored right)
      'justify-end pr-2 sm:pr-8'              // Far right
    ];

    categories.forEach((category) => {
      // Post Nodes (White tabs) under this category go FIRST (appearing "behind/above" the category)
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

      // Category Node (Black tab) goes LAST (appearing "in front/below" the posts)
      nodes.push({
        id: `cat-${category}`,
        type: 'category',
        label: category,
        tabClass: positions[tabIndex % positions.length],
      });
      tabIndex++;
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
