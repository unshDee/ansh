import{a as z,b as F}from"./chunk-PZXGHY2R.js";import{a as T}from"./chunk-AZ5XIONC.js";import{a as u,b as H}from"./chunk-TL3FAHS2.js";import{a as L}from"./chunk-DZX3IOKV.js";import{l as C}from"./chunk-QYKDDTVU.js";import{k as M}from"./chunk-5VRNBTMH.js";import{Ba as c,Bb as E,Ga as s,Ka as w,Oa as b,Xa as l,bb as i,cb as t,db as m,kb as y,lb as g,mb as v,nb as e,rb as S,tb as p,ub as f,vb as x}from"./chunk-YV7RGB6H.js";var R=["finetuningChart"],B=["selectionChart"],A=["paramChart"],_=["combinedChart"],P=()=>["MoleculeNet Lipophilicity","MolFormer","PyTorch","RDKit","DeepChem","Transformers"],j=class k{constructor(o,n){this.analyticsService=o;this.themeService=n;u.register(...H),E(()=>{let a=this.themeService.theme();setTimeout(()=>{this.updateChartsForTheme(a)},100)})}finetuningChart;selectionChart;paramChart;combinedChart;charts=[];ngOnInit(){this.analyticsService.trackProjectView("Data Selection and PEFT"),this.analyticsService.trackEvent("page_view",{page_title:"Data Selection and PEFT",page_location:"/projects/data-selection-peft",project_category:"machine-learning"})}ngAfterViewInit(){this.createFinetuningChart(),this.createSelectionChart(),this.createParamChart(),this.createCombinedChart()}ngOnDestroy(){this.charts.forEach(o=>o.destroy())}getThemeColors(){let o=this.themeService.theme()==="dark";return{text:o?"#e0e0e0":"#252525",border:o?"#444444":"#dddddd",background:o?"#1c1c1c":"#ffffff",primary:o?"#fe6060":"#db0000",secondary:o?"#ffffff":"#000000",green:o?"#4ade80":"#15803d",orange:o?"#fb923c":"#ea580c",amber:o?"#fbbf24":"#d97706",yellow:o?"#facc15":"#eab308",blue:o?"#60a5fa":"#2563eb"}}updateChartsForTheme(o){if(this.charts.length===0)return;let n=this.getThemeColors();this.charts.forEach((a,d)=>{a.options.plugins?.legend?.labels&&(a.options.plugins.legend.labels.color=n.text),a.options.scales&&Object.values(a.options.scales).forEach(r=>{r&&(r.ticks&&(r.ticks.color=n.text),r.title&&(r.title.color=n.text),r.grid&&(r.grid.color=n.border),r.angleLines&&(r.angleLines.color=n.border),r.pointLabels&&(r.pointLabels.color=n.text))}),a.data.datasets.forEach((r,h)=>{d===0?(r.backgroundColor=[n.primary,n.amber,n.green],r.borderColor=[n.primary,n.amber,n.green]):d===1?(r.backgroundColor=[n.primary,n.orange,n.amber,n.yellow,n.green],r.borderColor=[n.primary,n.orange,n.amber,n.yellow,n.green]):d===2?(h===0&&(r.borderColor=n.primary,r.backgroundColor=`${n.primary}30`,r.pointBackgroundColor=n.primary),h===1&&(r.borderColor=n.amber,r.backgroundColor=`${n.amber}30`,r.pointBackgroundColor=n.amber),h===2&&(r.borderColor=n.green,r.backgroundColor=`${n.green}30`,r.pointBackgroundColor=n.green)):d===3&&(h===0&&(r.borderColor=n.primary,r.backgroundColor=`${n.primary}15`,r.pointBackgroundColor=n.primary),h===1&&(r.borderColor=n.amber,r.backgroundColor=`${n.amber}15`,r.pointBackgroundColor=n.amber),h===2&&(r.borderColor=n.green,r.backgroundColor=`${n.green}15`,r.pointBackgroundColor=n.green))}),a.update("none")})}createFinetuningChart(){let o=this.finetuningChart.nativeElement.getContext("2d");if(!o)return;let n=this.getThemeColors(),a={type:"bar",data:{labels:["Pre-trained","Supervised Only","Unsupervised + Supervised"],datasets:[{label:"Test MSE",data:[1.15,.538,.532],backgroundColor:[n.primary,n.amber,n.green],borderColor:[n.primary,n.amber,n.green],borderWidth:0,borderRadius:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:d=>` MSE: ${(d.parsed.y??0).toFixed(3)}`}}},scales:{y:{beginAtZero:!0,max:1.3,ticks:{color:n.text},grid:{color:n.border},title:{display:!0,text:"Test MSE",color:n.text,font:{size:12}}},x:{ticks:{color:n.text},grid:{display:!1}}}}};this.charts.push(new u(o,a))}createSelectionChart(){let o=this.selectionChart.nativeElement.getContext("2d");if(!o)return;let n=this.getThemeColors(),a={type:"bar",data:{labels:["Random (185)","Diversity (185)","Active Learning (183)","Full External (300)","Influence (185)"],datasets:[{label:"Test MSE",data:[.576,.563,.548,.53,.51],backgroundColor:[n.primary,n.orange,n.amber,n.yellow,n.green],borderColor:[n.primary,n.orange,n.amber,n.yellow,n.green],borderWidth:0,borderRadius:4}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:d=>` MSE: ${(d.parsed.x??0).toFixed(3)}`}}},scales:{x:{beginAtZero:!1,min:.48,max:.62,ticks:{color:n.text},grid:{color:n.border},title:{display:!0,text:"Test MSE",color:n.text,font:{size:12}}},y:{ticks:{color:n.text,font:{size:11}},grid:{display:!1}}}}};this.charts.push(new u(o,a))}createParamChart(){let o=this.paramChart.nativeElement.getContext("2d");if(!o)return;let n=this.getThemeColors(),a={type:"radar",data:{labels:[`Parameter
Efficiency`,`Predictive
Performance`,`Implementation
Simplicity`],datasets:[{label:"BitFit",data:[9.4,2.4,10],borderColor:n.primary,backgroundColor:`${n.primary}30`,pointBackgroundColor:n.primary,pointBorderColor:n.text,borderWidth:2,pointRadius:4},{label:"LoRA",data:[0,10,5],borderColor:n.amber,backgroundColor:`${n.amber}30`,pointBackgroundColor:n.amber,pointBorderColor:n.text,borderWidth:2,pointRadius:4},{label:"(IA)\xB3",data:[10,1.5,8],borderColor:n.green,backgroundColor:`${n.green}30`,pointBackgroundColor:n.green,pointBorderColor:n.text,borderWidth:2,pointRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,labels:{color:n.text,font:{size:12},boxWidth:12,padding:16,usePointStyle:!0}},tooltip:{callbacks:{label:d=>` ${d.dataset.label}: ${d.raw.toFixed(1)} / 10`}}},scales:{r:{min:0,max:10,ticks:{display:!1,stepSize:2},grid:{color:n.border},angleLines:{color:n.border},pointLabels:{color:n.text,font:{size:11}}}}}};this.charts.push(new u(o,a))}createCombinedChart(){let o=this.combinedChart.nativeElement.getContext("2d");if(!o)return;let n=this.getThemeColors(),a={type:"line",data:{labels:["Full External","Random","Active Learning","Diversity","Influence"],datasets:[{label:"BitFit",data:[.534,.477,.487,.488,.497],borderColor:n.primary,backgroundColor:`${n.primary}15`,pointBackgroundColor:n.primary,pointBorderColor:n.text,pointRadius:5,pointHoverRadius:7,borderWidth:2.5,tension:.3,fill:!1},{label:"LoRA",data:[.102,.083,.088,.095,.093],borderColor:n.amber,backgroundColor:`${n.amber}15`,pointBackgroundColor:n.amber,pointBorderColor:n.text,pointRadius:5,pointHoverRadius:7,borderWidth:2.5,tension:.3,fill:!1},{label:"(IA)\xB3",data:[.524,.522,.533,.526,.547],borderColor:n.green,backgroundColor:`${n.green}15`,pointBackgroundColor:n.green,pointBorderColor:n.text,pointRadius:5,pointHoverRadius:7,borderWidth:2.5,tension:.3,fill:!1}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!0,labels:{color:n.text,font:{size:12},boxWidth:12,padding:16,usePointStyle:!0}},tooltip:{callbacks:{label:d=>` ${d.dataset.label}: ${(d.parsed.y??0).toFixed(3)} MSE`}}},scales:{y:{beginAtZero:!1,min:.05,max:.6,ticks:{color:n.text},grid:{color:n.border},title:{display:!0,text:"Test MSE",color:n.text,font:{size:12}}},x:{ticks:{color:n.text,font:{size:11}},grid:{color:n.border}}}}};this.charts.push(new u(o,a))}bitfitSvg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 222' width='300px' height='222px'>
  <!-- Predictions label -->
  <text x='150' y='14' text-anchor='middle' font-size='12' font-family='sans-serif' fill='currentColor'>Predictions</text>
  <!-- Arrow: regression head top \u2192 predictions -->
  <line x1='150' y1='36' x2='150' y2='22' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='144,22 156,22 150,15' fill='currentColor'/>
  <!-- Regression Head outer box (primary border = trainable) -->
  <rect x='58' y='36' width='184' height='80' rx='0' fill='none' stroke='var(--color-primary)' stroke-width='1.5'/>
  <!-- Rotated side label -->
  <text x='46' y='76' text-anchor='middle' font-size='8' font-family='sans-serif' fill='currentColor' transform='rotate(-90,46,76)'>Regression Head</text>
  <!-- Linear Layer inner box -->
  <rect x='70' y='44' width='160' height='26' rx='0' fill='none' stroke='currentColor' stroke-width='1.2'/>
  <text x='150' y='61' text-anchor='middle' font-size='11' font-family='sans-serif' fill='currentColor'>Linear Layer</text>
  <!-- Dropout inner box -->
  <rect x='70' y='80' width='160' height='26' rx='0' fill='none' stroke='currentColor' stroke-width='1.2'/>
  <text x='150' y='97' text-anchor='middle' font-size='11' font-family='sans-serif' fill='currentColor'>Dropout</text>
  <!-- Arrow: pretrained top \u2192 regression head bottom -->
  <line x1='150' y1='130' x2='150' y2='120' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='144,120 156,120 150,116' fill='currentColor'/>
  <!-- Pretrained Model box (currentColor = frozen) -->
  <rect x='40' y='130' width='220' height='56' rx='0' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='150' y='151' text-anchor='middle' font-size='11' font-family='sans-serif' fill='currentColor'>Pretrained Model</text>
  <!-- Trainable bias dots in primary colour -->
  <circle cx='118' cy='164' r='3.5' fill='var(--color-primary)'/>
  <circle cx='132' cy='164' r='3.5' fill='var(--color-primary)'/>
  <circle cx='146' cy='164' r='3.5' fill='var(--color-primary)'/>
  <circle cx='160' cy='164' r='3.5' fill='var(--color-primary)'/>
  <circle cx='174' cy='164' r='3.5' fill='var(--color-primary)'/>
  <text x='150' y='177' text-anchor='middle' font-size='8.5' font-family='sans-serif' font-style='italic' fill='currentColor'>only bias b terms trainable</text>
  <!-- Arrow: SMILES \u2192 pretrained -->
  <line x1='150' y1='210' x2='150' y2='192' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='144,192 156,192 150,186' fill='currentColor'/>
  <!-- SMILES label -->
  <text x='150' y='220' text-anchor='middle' font-size='12' font-family='sans-serif' fill='currentColor'>SMILES</text>
</svg>`;loraSvg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 232' width='300px' height='232px'>
  <!-- h label -->
  <text x='150' y='12' text-anchor='middle' font-size='13' font-family='sans-serif' font-style='italic' fill='currentColor'>h</text>
  <!-- h green bar -->
  <rect x='15' y='16' width='270' height='13' rx='0' stroke='var(--color-green)' stroke-width='1.5' fill='none'/>
  <!-- Arrows: frozen W top and LoRA B top \u2192 h bar -->
  <line x1='57' y1='42' x2='57' y2='30' stroke='currentColor' stroke-width='2'/>
  <polygon points='51,30 63,30 57,24' fill='currentColor'/>
  <line x1='200' y1='42' x2='200' y2='30' stroke='currentColor' stroke-width='2'/>
  <polygon points='194,30 206,30 200,24' fill='currentColor'/>
  <!-- + merge symbol -->
  <text x='128' y='38' text-anchor='middle' font-size='17' font-family='sans-serif' fill='currentColor'>+</text>
  <!-- Pretrained Weights frozen box -->
  <rect x='18' y='42' width='78' height='154' rx='0' fill='none' stroke='currentColor' stroke-width='1.8'/>
  <text x='57' y='119' text-anchor='middle' font-size='9' font-family='sans-serif' fill='currentColor' transform='rotate(-90,57,119)'>Pretrained Weights</text>
  <!-- B = 0 trapezoid (wider at top \u2192 narrow at rank r bottom) -->
  <polygon points='118,42 282,42 236,102 164,102' fill='none' stroke='var(--color-primary)' stroke-width='1.8'/>
  <text x='200' y='78' text-anchor='middle' font-size='13' font-family='sans-serif' fill='var(--color-primary)'>B = 0</text>
  <!-- rank r bracket between trapezoids -->
  <path d='M 158,106 Q 158,116 200,116 Q 242,116 242,106' fill='none' stroke='currentColor' stroke-width='1.2'/>
  <text x='200' y='126' text-anchor='middle' font-size='11' font-family='sans-serif' font-style='italic' fill='currentColor'>r</text>
  <!-- A = U(-b,b) trapezoid (narrow at rank r top \u2192 wider at bottom) -->
  <polygon points='164,130 236,130 282,196 118,196' fill='none' stroke='var(--color-primary)' stroke-width='1.8'/>
  <text x='200' y='166' text-anchor='middle' font-size='11' font-family='sans-serif' fill='var(--color-primary)'>A = U(-b, b)</text>
  <!-- x green bar -->
  <rect x='15' y='200' width='270' height='13' rx='0' stroke='var(--color-green)' stroke-width='1.5' fill='none'/>
  <!-- x label -->
  <text x='150' y='226' text-anchor='middle' font-size='13' font-family='sans-serif' font-style='italic' fill='currentColor'>x</text>
</svg>`;ia3Svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 252' width='300px' height='252px'>

  <!-- ========== ATTENTION SIDE ========== -->

  <!-- Output arrow at top-left -->
  <line x1='18' y1='24' x2='18' y2='10' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='13,10 23,10 18,5' fill='currentColor'/>
  <!-- Top horizontal rail: connects \u2299_V path to softmax output path -->
  <line x1='18' y1='24' x2='145' y2='24' stroke='currentColor' stroke-width='1.5'/>

  <!-- softmax \u2192 rail (vertical at softmax center x=145, from softmax top y=106 to rail y=24) -->
  <line x1='145' y1='106' x2='145' y2='24' stroke='currentColor' stroke-width='1.5'/>

  <!-- softmax box (green border). Center x=145, center y=120, top=106, bottom=134 -->
  <rect x='108' y='106' width='74' height='28' fill='none' stroke='var(--color-green)' stroke-width='1.5'/>
  <text x='145' y='124' text-anchor='middle' font-size='11' font-family='sans-serif' fill='currentColor'>softmax</text>

  <!-- \u2299_V circle: far-left column, ABOVE the softmax level: cx=18, cy=68 -->
  <circle cx='18' cy='68' r='9' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='18' y='73' text-anchor='middle' font-size='15' font-family='sans-serif' fill='currentColor'>&#x2219;</text>
  <!-- \u2299_V \u2192 rail (upward, no arrowhead \u2013 just joins rail) -->
  <line x1='18' y1='59' x2='18' y2='24' stroke='currentColor' stroke-width='1.5'/>

  <!-- \u2113_V box: to the RIGHT of \u2299_V, same height -->
  <rect x='34' y='59' width='46' height='18' fill='none' stroke='var(--color-primary)' stroke-width='1.5'/>
  <text x='57' y='72' text-anchor='middle' font-size='11' font-family='sans-serif' fill='var(--color-primary)'>&#x2113;<tspan dy='3' font-size='8'>V</tspan></text>
  <!-- Arrow: \u2113_V \u2192 \u2299_V (pointing LEFT, tip at \u2299_V right edge x=27) -->
  <polygon points='34,64 34,72 28,68' fill='currentColor'/>

  <!-- V box: bottom-left, directly below \u2299_V column -->
  <rect x='3' y='180' width='30' height='24' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='18' y='196' text-anchor='middle' font-size='13' font-family='sans-serif' fill='currentColor'>V</text>
  <!-- V \u2192 \u2299_V (upward, arrowhead at \u2299_V bottom y=77) -->
  <line x1='18' y1='180' x2='18' y2='79' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='13,79 23,79 18,73' fill='currentColor'/>

  <!-- \u2299_K circle: same vertical level as softmax center (cy=120), left of softmax -->
  <!-- cx=93, cy=120. left=84, right=102. Softmax left=108 -->
  <circle cx='93' cy='120' r='9' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='93' y='125' text-anchor='middle' font-size='15' font-family='sans-serif' fill='currentColor'>&#x2219;</text>
  <!-- \u2299_K \u2192 softmax LEFT SIDE (horizontal arrow at y=120, entering from the left) -->
  <line x1='102' y1='120' x2='105' y2='120' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='103,116 103,124 109,120' fill='currentColor'/>

  <!-- \u2113_K box: to the LEFT of \u2299_K, same height -->
  <!-- x=38, w=40, right=78. \u2299_K left=84. gap=6px -->
  <rect x='38' y='110' width='40' height='20' fill='none' stroke='var(--color-primary)' stroke-width='1.5'/>
  <text x='58' y='124' text-anchor='middle' font-size='11' font-family='sans-serif' fill='var(--color-primary)'>&#x2113;<tspan dy='3' font-size='8'>K</tspan></text>
  <!-- Arrow: \u2113_K \u2192 \u2299_K (pointing RIGHT, tip at \u2299_K left edge x=84) -->
  <line x1='78' y1='120' x2='80' y2='120' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='78,116 78,124 84,120' fill='currentColor'/>

  <!-- K box: at x=93 column, bottom row -->
  <rect x='77' y='180' width='32' height='24' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='93' y='196' text-anchor='middle' font-size='13' font-family='sans-serif' fill='currentColor'>K</text>
  <!-- K \u2192 \u2299_K (upward, arrowhead at \u2299_K bottom y=129) -->
  <line x1='93' y1='180' x2='93' y2='131' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='88,131 98,131 93,125' fill='currentColor'/>

  <!-- Q box: directly below softmax center (x=145), bottom row -->
  <rect x='130' y='180' width='30' height='24' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='145' y='196' text-anchor='middle' font-size='13' font-family='sans-serif' fill='currentColor'>Q</text>
  <!-- Q \u2192 softmax BOTTOM (upward, separate from K/\u2299K path \u2014 enters softmax from below) -->
  <line x1='145' y1='180' x2='145' y2='136' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='140,136 150,136 145,130' fill='currentColor'/>

  <!-- ========== SEPARATOR ========== -->
  <line x1='196' y1='5' x2='196' y2='216' stroke='currentColor' stroke-width='0.5' stroke-dasharray='4,4'/>

  <!-- ========== FFN SIDE (center x=251) ========== -->

  <!-- h label + output arrow -->
  <text x='251' y='13' text-anchor='middle' font-size='12' font-family='sans-serif' font-style='italic' fill='currentColor'>h</text>
  <line x1='251' y1='25' x2='251' y2='19' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='246,19 256,19 251,13' fill='currentColor'/>

  <!-- dense top -->
  <rect x='213' y='25' width='76' height='26' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='251' y='42' text-anchor='middle' font-size='11' font-family='sans-serif' fill='currentColor'>dense</text>

  <!-- \u2299_FF \u2192 dense top -->
  <line x1='251' y1='66' x2='251' y2='52' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='246,52 256,52 251,46' fill='currentColor'/>

  <!-- \u2299_FF circle -->
  <circle cx='251' cy='76' r='9' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='251' y='81' text-anchor='middle' font-size='15' font-family='sans-serif' fill='currentColor'>&#x2219;</text>

  <!-- \u2113_FF box: to the RIGHT of \u2299_FF -->
  <rect x='266' y='66' width='30' height='20' fill='none' stroke='var(--color-primary)' stroke-width='1.5'/>
  <text x='281' y='80' text-anchor='middle' font-size='9' font-family='sans-serif' fill='var(--color-primary)'>&#x2113;<tspan dy='3' font-size='7'>FF</tspan></text>
  <!-- Arrow: \u2113_FF \u2192 \u2299_FF (pointing LEFT) -->
  <polygon points='266,71 266,81 260,76' fill='currentColor'/>

  <!-- nonlinearity \u2192 \u2299_FF -->
  <line x1='251' y1='116' x2='251' y2='87' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='246,87 256,87 251,81' fill='currentColor'/>

  <!-- nonlinearity box (green border) -->
  <rect x='213' y='116' width='76' height='26' fill='none' stroke='var(--color-green)' stroke-width='1.5'/>
  <text x='251' y='133' text-anchor='middle' font-size='10' font-family='sans-serif' fill='currentColor'>nonlinearity</text>

  <!-- dense bottom \u2192 nonlinearity -->
  <line x1='251' y1='164' x2='251' y2='144' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='246,144 256,144 251,138' fill='currentColor'/>

  <!-- dense bottom -->
  <rect x='213' y='164' width='76' height='26' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='251' y='181' text-anchor='middle' font-size='11' font-family='sans-serif' fill='currentColor'>dense</text>

  <!-- Input line stub at bottom of FFN -->
  <line x1='251' y1='190' x2='251' y2='205' stroke='currentColor' stroke-width='1.5'/>

  <!-- Section labels -->
  <text x='85' y='220' text-anchor='middle' font-size='9' font-family='sans-serif' fill='currentColor' opacity='0.6'>Attention</text>
  <text x='251' y='218' text-anchor='middle' font-size='9' font-family='sans-serif' fill='currentColor' opacity='0.6'>FFN</text>
</svg>`;benzeneSvg=`
  <svg version='1.1' baseProfile='full'
              xmlns='http://www.w3.org/2000/svg'
                      xmlns:rdkit='http://www.rdkit.org/xml'
                      xmlns:xlink='http://www.w3.org/1999/xlink'
                      xml:space='preserve'
              width='300px' height='200px' viewBox='0 0 300 200'>
  <!-- END OF HEADER -->
    <rect style='opacity:0.0;fill:none;stroke:none' width='300.0' height='200.0' x='0.0' y='0.0'> </rect>
    <path class='bond-0 atom-0 atom-1' d='M 253.9,100.0 L 202.0,190.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-0 atom-0 atom-1' d='M 235.9,100.0 L 193.0,174.4' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-1 atom-1 atom-2' d='M 202.0,190.0 L 98.0,190.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 98.0,190.0 L 46.1,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 107.0,174.4 L 64.1,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-3 atom-3 atom-4' d='M 46.1,100.0 L 98.0,10.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 98.0,10.0 L 202.0,10.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 107.0,25.6 L 193.0,25.6' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-5 atom-5 atom-0' d='M 202.0,10.0 L 253.9,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path d='M 251.3,104.5 L 253.9,100.0 L 251.3,95.5' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 204.6,185.5 L 202.0,190.0 L 196.8,190.0' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 103.2,190.0 L 98.0,190.0 L 95.4,185.5' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 48.7,104.5 L 46.1,100.0 L 48.7,95.5' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 95.4,14.5 L 98.0,10.0 L 103.2,10.0' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 196.8,10.0 L 202.0,10.0 L 204.6,14.5' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
  </svg>`;tolueneSvg=`<svg version='1.1' baseProfile='full'
              xmlns='http://www.w3.org/2000/svg'
                      xmlns:rdkit='http://www.rdkit.org/xml'
                      xmlns:xlink='http://www.w3.org/1999/xlink'
                  xml:space='preserve'
              width='300px' height='200px' viewBox='0 0 300 200'>
  <!-- END OF HEADER -->
    <rect style='opacity:0.0;fill:none;stroke:none' width='300.0' height='200.0' x='0.0' y='0.0'> </rect>
    <path class='bond-0 atom-0 atom-1' d='M 285.0,100.0 L 195.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-1 atom-1 atom-2' d='M 195.0,100.0 L 150.0,177.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-1 atom-1 atom-2' d='M 179.4,100.0 L 142.2,164.4' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 150.0,177.9 L 60.0,177.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-3 atom-3 atom-4' d='M 60.0,177.9 L 15.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-3 atom-3 atom-4' d='M 67.8,164.4 L 30.6,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 15.0,100.0 L 60.0,22.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-5 atom-5 atom-6' d='M 60.0,22.1 L 150.0,22.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-5 atom-5 atom-6' d='M 67.8,35.6 L 142.2,35.6' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-6 atom-6 atom-1' d='M 150.0,22.1 L 195.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path d='M 152.2,174.0 L 150.0,177.9 L 145.5,177.9' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 64.5,177.9 L 60.0,177.9 L 57.7,174.0' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 17.2,103.9 L 15.0,100.0 L 17.3,96.1' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 57.8,26.0 L 60.0,22.1 L 64.5,22.1' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 145.5,22.1 L 150.0,22.1 L 152.3,26.0' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
  </svg>`;phenolSvg=`<svg version='1.1' baseProfile='full'
              xmlns='http://www.w3.org/2000/svg'
                      xmlns:rdkit='http://www.rdkit.org/xml'
                      xmlns:xlink='http://www.w3.org/1999/xlink'
                  xml:space='preserve'
              width='300px' height='200px' viewBox='0 0 300 200'>
  <!-- END OF HEADER -->
    <rect style='opacity:0.0;fill:none;stroke:none' width='300.0' height='200.0' x='0.0' y='0.0'> </rect>
    <path class='bond-0 atom-0 atom-1' d='M 134.3,168.9 L 54.8,168.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-0 atom-0 atom-1' d='M 127.4,156.9 L 61.6,156.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-1 atom-1 atom-2' d='M 54.8,168.9 L 15.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 15.0,100.0 L 54.8,31.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 28.8,100.0 L 61.6,43.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-3 atom-3 atom-4' d='M 54.8,31.1 L 134.3,31.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 134.3,31.1 L 174.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 127.4,43.1 L 160.3,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-5 atom-5 atom-6' d='M 174.0,100.0 L 240.6,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-6 atom-5 atom-0' d='M 174.0,100.0 L 134.3,168.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path d='M 130.3,168.9 L 134.3,168.9 L 136.3,165.4' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 58.7,168.9 L 54.8,168.9 L 52.8,165.4' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 17.0,103.4 L 15.0,100.0 L 17.0,96.6' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 52.8,34.6 L 54.8,31.1 L 58.7,31.1' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 130.3,31.1 L 134.3,31.1 L 136.3,34.6' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path class='atom-6' d='M 243.2 100.1
    Q 243.2 94.7, 245.9 91.6
    Q 248.5 88.6, 253.5 88.6
    Q 258.5 88.6, 261.2 91.6
    Q 263.9 94.7, 263.9 100.1
    Q 263.9 105.5, 261.2 108.7
    Q 258.5 111.7, 253.5 111.7
    Q 248.6 111.7, 245.9 108.7
    Q 243.2 105.6, 243.2 100.1
    M 253.5 109.2
    Q 257.0 109.2, 258.8 106.9
    Q 260.7 104.6, 260.7 100.1
    Q 260.7 95.6, 258.8 93.4
    Q 257.0 91.2, 253.5 91.2
    Q 250.1 91.2, 248.2 93.4
    Q 246.4 95.6, 246.4 100.1
    Q 246.4 104.6, 248.2 106.9
    Q 250.1 109.2, 253.5 109.2
    ' fill='var(--color-primary)'/>
    <path class='atom-6' d='M 267.4 88.9
    L 270.4 88.9
    L 270.4 98.4
    L 281.9 98.4
    L 281.9 88.9
    L 285.0 88.9
    L 285.0 111.4
    L 281.9 111.4
    L 281.9 101.0
    L 270.4 101.0
    L 270.4 111.4
    L 267.4 111.4
    L 267.4 88.9
    ' fill='var(--color-primary)'/>
  </svg>`;static \u0275fac=function(n){return new(n||k)(w(M),w(C))};static \u0275cmp=b({type:k,selectors:[["app-data-selection-peft"]],viewQuery:function(n,a){if(n&1&&(y(R,5),y(B,5),y(A,5),y(_,5)),n&2){let d;g(d=v())&&(a.finetuningChart=d.first),g(d=v())&&(a.selectionChart=d.first),g(d=v())&&(a.paramChart=d.first),g(d=v())&&(a.combinedChart=d.first)}},decls:520,vars:69,consts:[["finetuningChart",""],["selectionChart",""],["paramChart",""],["combinedChart",""],["projectTitle","Data Selection and PEFT","note","Course Project - Neural Networks: Theory & Implementation","demo","Presentation Slides","demoLink","https://drive.google.com/file/d/1NhdlThoa11bkA3tDl32nnOwEyzkYRxSn/view?usp=sharing",3,"technologies"],["description",""],[1,"italic"],["content",""],[1,"grid","grid-cols-4","gap-4"],[1,"font-serif","text-xl","text-justify","col-span-4","lg:col-span-3"],[1,"text-4xl"],["href","https://moleculenet.org/datasets-1","target","_blank",1,"underline","underline-offset-4","decoration-1"],[1,"col-span-4","lg:col-span-1"],[1,"text-3xl","my-4","lg:my-0","lg:text-lg","lg:font-light"],[1,"grid","grid-cols-2","gap-2"],["windowTitle","Lipophilicity",1,"col-span-1","lg:col-span-2"],[1,"list-disc","pl-4"],[1,"font-bold"],["windowTitle","External",1,"col-span-1","lg:col-span-2"],[1,"text-3xl","my-4","mt-8"],["href","https://arxiv.org/abs/1703.00564","target","_blank",1,"group"],[1,"font-extralight","transform","duration-300","ease-in-out","group-hover:text-(--color-primary)","group-hover:translate-3"],[1,"font-serif","text-justify"],[1,"text-xl"],[1,"font-serif","text-xl"],[1,"font-sans","text-2xl","my-4"],[1,"grid","grid-cols-2","gap-y-4","gap-x-8","mt-4"],[1,"col-span-2","lg:col-span-1"],[1,"font-sans","text-2xl","mb-4"],["href","https://en.wikipedia.org/wiki/Simplified_Molecular_Input_Line_Entry_System",1,"underline","underline-offset-4","decoration-1"],[1,"font-sans","col-span-2","lg:col-span-1"],["windowTitle","Phenol is Oc1ccccc1"],[1,"flex","flex-col","items-center"],[3,"innerHTML"],["windowTitle","Toluene is Cc1ccccc1"],[1,"grid","grid-cols-2","gap-4","gap-x-8","mt-8"],[1,"col-span-2","lg:col-span-1","font-serif","text-xl","text-justify"],[1,"font-sans","text-3xl","mb-4"],[1,"mt-2"],["windowTitle","Scaffold"],[1,"text-justify"],[1,"font-serif","text-xl","mb-4"],[1,"relative"],[1,"grid","grid-cols-6","grid-rows-2","gap-1"],["windowTitle","random",1,"col-span-3","lg:col-span-2",3,"initialMinimized"],["windowTitle","scaffold",1,"col-span-3","lg:col-span-2",3,"initialMinimized"],["windowTitle","weight",1,"col-span-3","lg:col-span-2",3,"initialMinimized"],["windowTitle","maxmin",1,"col-span-3","lg:col-span-2",3,"initialMinimized"],["windowTitle","butina",1,"col-span-3","lg:col-span-2",3,"initialMinimized"],["windowTitle","fingerprint",1,"col-span-3","lg:col-span-2",3,"initialMinimized"],[1,"text-2xl","my-4","mt-8"],[1,"font-serif","text-xl","text-justify"],["href","https://research.ibm.com/blog/molecular-transformer-discovery","target","_blank",1,"group"],["href","https://research.ibm.com/blog/molecular-transformer-discovery",1,"underline","underline-offset-4","decoration-1","italic"],[1,"grid","grid-cols-1","lg:grid-cols-2","gap-4","mt-4","mb-8"],["windowTitle","Architecture",3,"initialMinimized"],[1,"font-sans"],[1,"grid","grid-cols-1","gap-3"],[1,"p-3","border-b","border-(--color-text)/20"],[1,"font-bold","mb-1"],[1,"text-sm"],[1,"p-3"],["windowTitle","Regression Head",3,"initialMinimized"],[1,"text-base","mb-2"],[1,"grid","grid-cols-1","gap-2","text-sm"],[1,"flex","justify-between"],[1,"font-mono"],[1,"text-3xl","my-4","mt-10"],[1,"font-serif","text-xl","text-justify","mb-4"],[1,"grid","grid-cols-1","lg:grid-cols-2","gap-6","mb-8"],[1,"col-span-1"],["windowTitle","Stage 1: Unsupervised MLM"],[1,"text-sm","mb-3"],[1,"font-mono",3,"innerHTML"],["windowTitle","Stage 2: Supervised Regression"],[1,"font-serif","text-lg","text-justify","mb-4"],[1,"grid","grid-cols-1","mb-8"],["windowTitle","Fine-Tuning Results (Test Set)"],[1,"h-72"],["href","https://arxiv.org/abs/1703.04730","target","_blank",1,"group"],[1,"grid","grid-cols-1","lg:grid-cols-2","gap-4","mb-8"],["windowTitle","Influence Score Formula",1,"col-span-2","lg:col-span-1",3,"initialMinimized"],[1,"font-serif","text-lg","mb-2"],[1,"equation-block",3,"innerHTML"],[1,"font-sans","text-sm","mt-3","text-(--color-text)"],["windowTitle","LiSSA Approximation",1,"col-span-2","lg:col-span-1",3,"initialMinimized"],["windowTitle","Random Selection",1,"col-span-1"],[1,"text-lg","font-bold","mb-2",2,"color","var(--color-primary)"],[1,"text-xs","italic","text-(--color-text)"],["windowTitle","Active Learning",1,"col-span-1"],["windowTitle","Diversity (MaxMin)",1,"col-span-1"],["windowTitle","Influence Score",1,"col-span-1"],["windowTitle","Data Selection Results (Test MSE)"],[1,"h-80"],[1,"grid","grid-cols-1","lg:grid-cols-3","gap-4","mb-8"],["windowTitle","BitFit",1,"col-span-1"],[1,"bg-(--color-bg)","p-2","rounded","border","border-(--color-text)/30","text-sm"],[1,"font-mono","text-xs"],[1,"font-mono","text-xs","mt-1"],[1,"mt-2","grid","grid-cols-1","gap-1","text-xs"],[1,"mt-4","flex","justify-center",3,"innerHTML"],["windowTitle","LoRA",1,"col-span-1"],["windowTitle","(IA)\xB3",1,"col-span-1"],["windowTitle","Efficiency vs. Performance vs. Simplicity"],[1,"h-96"],[1,"text-xs","text-center","mt-2","text-(--color-text)","px-4","pb-2"],["windowTitle","PEFT \xD7 Data Selection (Test MSE)"],["windowTitle","Best BitFit",1,"col-span-1"],[1,"space-y-2","font-sans","text-lg"],[1,"text-xl","font-mono"],[1,""],["windowTitle","Best LoRA",1,"col-span-1"],[1,"text-xl","font-mono",2,"color","var(--color-green)"],["windowTitle","Best (IA)\xB3",1,"col-span-1"],["windowTitle","Data Selection",1,"col-span-2","lg:col-span-1"],[1,"font-sans","text-md","text-justify","space-y-2","list-disc","list-inside"],["windowTitle","PEFT Techniques",1,"col-span-2","lg:col-span-1"],[1,"font-serif","text-xl","text-justify","mb-6"]],template:function(n,a){n&1&&(i(0,"app-project-template",4)(1,"div",5),e(2," Selecting "),i(3,"span",6),e(4,"Influential"),t(),e(5," Data for different Parameter-Efficient Fine-Tuning Techniques "),t(),i(6,"div",7)(7,"div",8)(8,"div",9)(9,"span",10),e(10,"T"),t(),e(11,'his course project for "Neural Networks: Theory and Implementation" addresses different data selection strategies for Parameter-Efficient Fine-Tuning (PEFT) in molecular property prediction. By combining the best data selection method to select points from an external dataset with BitFit, LoRA, and (IA)'),i(12,"sup"),e(13,"3"),t(),e(14," techniques, the project fine-tunes MolFormer on the "),i(15,"a",11),e(16,"MoleculeNet Lipophilicity dataset"),t(),e(17," using criteria based on gradient norms, embedding distances, and uncertainty estimates. Results demonstrate reduced computational requirements while maintaining comparable predictive performance to full dataset fine-tuning, enabling more resource-conscious adaptation of pre-trained models to specific chemical prediction tasks. "),t(),i(18,"div",12)(19,"h2",13),e(20,"Datasets"),t(),i(21,"div",14)(22,"app-window",15)(23,"ul",16)(24,"li"),e(25,"4200 data points"),t(),i(26,"li",17),e(27,"2444 unique scaffolds"),t()()(),i(28,"app-window",18)(29,"ul",16)(30,"li"),e(31,"300 data points"),t()()()()()(),i(32,"h2",19)(33,"a",20),e(34,"MoleculeNet Benchmark"),i(35,"sup",21),e(36,"\u2197"),t()()(),i(37,"div",22)(38,"div",23)(39,"a",11),e(40,"MoleculeNet"),t(),e(41," contains various datasets for molecular property prediction tasks. The datasets are used to benchmark machine learning models for drug discovery and molecular property prediction. The datasets are curated from various sources and are used to evaluate the performance of models on different molecular property prediction tasks "),t(),i(42,"div",24)(43,"h3",25),e(44,"Lipophilicity Dataset"),t(),e(45," The "),i(46,"span",6),e(47,"Lipophilicity dataset"),t(),e(48," contains experimental lipophilicity values for 4200 molecules represented as SMILES strings. "),t(),i(49,"div",26)(50,"div",27)(51,"h3",28),e(52,"SMILES"),t(),i(53,"div",23),e(54," Simplified Molecular Input Line Entry System (SMILES) is a line notation for representing molecules and reactions. It encodes molecular structures as line notations using ASCII strings, which can be used to generate molecular graphs. These notations follow a "),i(55,"a",29),e(56,"certain set of rules"),t(),e(57," which can be parsed to generate molecular structures. "),t()(),i(58,"div",30)(59,"app-window",31)(60,"div",32),m(61,"div",33),p(62,"safeHTML"),m(63,"div",33),p(64,"safeLatex"),t()()(),i(65,"div",30)(66,"app-window",34)(67,"div",32),m(68,"div",33),p(69,"safeHTML"),m(70,"div",33),p(71,"safeLatex"),t()()(),i(72,"div",27)(73,"h3",28),e(74,"Lipophilicity Values"),t(),i(75,"div",23),e(76," Lipophilicity is a measure of the ability of a chemical compound to dissolve in fats, oils, and lipids. It is a key property in drug discovery and design, influencing the absorption, distribution, metabolism, and excretion of drugs. The dataset contains experimental lipophilicity values for the corresponding SMILES strings. "),t()()()(),i(77,"div",35)(78,"div",36)(79,"h3",37),e(80,"What are Scaffolds?"),t(),i(81,"span",6),e(82,"Scaffolds"),t(),e(83," are the core structures of molecules that are common across different molecules. They are used to represent the core structure of a molecule and are used to group molecules based on their structural similarity. Scaffolds are used in cheminformatics to analyze and compare molecular structures. "),i(84,"div",38),e(85," For examples, the compounds - "),i(86,"span",6),e(87,"benzene"),t(),e(88,", "),i(89,"span",6),e(90,"toluene"),t(),e(91,", and "),i(92,"span",6),e(93,"phenol"),t(),e(94," have the same scaffold - "),i(95,"span",6),e(96,"benzene"),t(),e(97,". "),t()(),i(98,"div",27)(99,"app-window",39)(100,"div",32),m(101,"div",33),p(102,"safeHTML"),m(103,"div",33),p(104,"safeLatex"),t()()()(),i(105,"h2",19),e(106,"Data Splitting"),t(),i(107,"div",40)(108,"div",41),e(109," For datasets containing molecular structures, it is essential to split the such that it generalizes well to novel molecules. The dataset splits might contain overlapping scaffolds, which can lead to data leakage and overfitting. "),m(110,"br"),i(111,"div",38),e(112," Different data splitting strategies were tested and the best performing one was selected to be used for the PEFT experiments. The main criteria for selecting the splitting strategy was to ensure there were no overlapping scaffolds between the sets. The following splits from DeepChem were tested: "),t()(),i(113,"div",42)(114,"div",43)(115,"app-window",44),e(116," Random data splits "),t(),i(117,"app-window",45),e(118," Scaffold-based data splits (Bemis-Murcko scaffold) "),t(),i(119,"app-window",46),e(120," Molecular weight splits "),t(),i(121,"app-window",47),e(122," Diversity splits based on MaxMin diversity algorithm "),t(),i(123,"app-window",48),e(124," Data splits based on Butina clustering of a bulk Tanimoto fingerprint matrix "),t(),i(125,"app-window",49),e(126," Splits based on Tanimoto similar between ECFP4 fingerprints "),t()()(),i(127,"h3",50),e(128,"Observations"),t(),i(129,"div",51),e(130," The scaffold-based splitting strategy was selected as it ensures that no overlapping scaffolds exist between train, validation, and test sets. This prevents data leakage from structurally similar molecules and ensures the model generalizes to novel molecular scaffolds. The final split achieves approximately 80/10/10 train/validation/test distribution. "),t()(),i(131,"h2",19)(132,"a",52),e(133,"MolFormer"),i(134,"sup",21),e(135,"\u2197"),t()()(),i(136,"div",51)(137,"a",53),e(138,"MolFormer"),t(),e(139," is a transformer-based model for molecular property prediction, pre-trained on a large corpus of ~1.1 billion unlabelled SMILES strings. It uses a linear attention mechanism to efficiently process molecular representations and can be fine-tuned for specific downstream tasks. "),t(),i(140,"div",54)(141,"app-window",55)(142,"div",56)(143,"div",57)(144,"div",58)(145,"div",59),e(146,"Model"),t(),i(147,"div",60),e(148,"MoLFormer-XL-both-10pct"),t()(),i(149,"div",58)(150,"div",59),e(151,"Hidden Size"),t(),i(152,"div",60),e(153,"768"),t()(),i(154,"div",58)(155,"div",59),e(156,"Attention"),t(),i(157,"div",60),e(158,"Linear attention mechanism"),t()(),i(159,"div",61)(160,"div",59),e(161,"Pre-training Data"),t(),i(162,"div",60),e(163,"~1.1B unlabelled SMILES strings"),t()()()()(),i(164,"app-window",62)(165,"div",56)(166,"div",63),e(167," A linear layer added on top of the pooler output for predicting continuous lipophilicity values. "),t(),i(168,"div",64)(169,"div",65)(170,"span"),e(171,"Classifier Dropout"),t(),i(172,"span",66),e(173,"0.5"),t()(),i(174,"div",65)(175,"span"),e(176,"Embedding Dropout"),t(),i(177,"span",66),e(178,"0.2"),t()(),i(179,"div",65)(180,"span"),e(181,"Hidden Dropout"),t(),i(182,"span",66),e(183,"0.2"),t()(),i(184,"div",65)(185,"span"),e(186,"Output"),t(),i(187,"span",66),e(188,"1 (scalar)"),t()()()()()(),i(189,"h2",67),e(190,"Fine-Tuning Pipeline"),t(),i(191,"div",68),e(192," The fine-tuning process follows a two-stage approach: first, "),i(193,"span",6),e(194,"unsupervised"),t(),e(195," fine-tuning using Masked Language Modeling (MLM) to adapt the model to the domain-specific molecular distribution, followed by "),i(196,"span",6),e(197,"supervised"),t(),e(198," fine-tuning with the regression head for lipophilicity prediction. "),t(),i(199,"div",69)(200,"div",70)(201,"app-window",71)(202,"div",56)(203,"div",72),e(204," Masked Language Modeling adapts the pre-trained model to the chemical language patterns specific to the Lipophilicity training set, without using any labels. "),t(),i(205,"div",64)(206,"div",65)(207,"span"),e(208,"Objective"),t(),i(209,"span",66),e(210,"CrossEntropyLoss"),t()(),i(211,"div",65)(212,"span"),e(213,"Masking Probability"),t(),i(214,"span",66),e(215,"15%"),t()(),i(216,"div",65)(217,"span"),e(218,"Optimizer"),t(),i(219,"span",66),e(220,"AdamW"),t()(),i(221,"div",65)(222,"span"),e(223,"Learning Rate"),t(),m(224,"span",73),p(225,"safeLatex"),t(),i(226,"div",65)(227,"span"),e(228,"Early Stopping"),t(),i(229,"span",66),e(230,"Patience = 2"),t()()()()()(),i(231,"div",70)(232,"app-window",74)(233,"div",56)(234,"div",72),e(235," Fine-tuning with the regression head on labeled lipophilicity values, starting from the unsupervised-adapted checkpoint. "),t(),i(236,"div",64)(237,"div",65)(238,"span"),e(239,"Loss Function"),t(),i(240,"span",66),e(241,"MSELoss"),t()(),i(242,"div",65)(243,"span"),e(244,"Evaluation Metric"),t(),i(245,"span",66),e(246,"MAE"),t()(),i(247,"div",65)(248,"span"),e(249,"Optimizer"),t(),i(250,"span",66),e(251,"AdamW"),t()(),i(252,"div",65)(253,"span"),e(254,"Learning Rate"),t(),m(255,"span",73),p(256,"safeLatex"),t(),i(257,"div",65)(258,"span"),e(259,"Batch Size"),t(),i(260,"span",66),e(261,"64"),t()()()()()()(),i(262,"h3",28),e(263,"Fine-Tuning Comparison"),t(),i(264,"div",75),e(265," The two-stage approach (unsupervised MLM + supervised regression) outperforms direct supervised fine-tuning, demonstrating the benefit of domain adaptation before task-specific training. "),t(),i(266,"div",76)(267,"app-window",77)(268,"div",78),m(269,"canvas",null,0),t()()(),i(271,"h2",67)(272,"a",79),e(273,"Influence Functions"),i(274,"sup",21),e(275,"\u2197"),t()()(),i(276,"div",68),e(277," Influence functions approximate the effect of each training point on model predictions. By computing the inverse Hessian-vector product (iHVP) through "),i(278,"span",6),e(279,"LiSSA (Linear time Stochastic Second-order Algorithm)"),t(),e(280,", we estimate how including or removing each external data point would affect the test loss. "),t(),i(281,"div",80)(282,"app-window",81)(283,"div",82),e(284," The influence of a training point on the test loss: "),t(),m(285,"div",83),p(286,"safeLatex"),i(287,"div",84),e(288," Where "),m(289,"span",33),p(290,"safeLatex"),e(291," is the Hessian of the training loss "),t()(),i(292,"app-window",85)(293,"div",82),e(294," The iHVP is iteratively estimated: "),t(),m(295,"div",83),p(296,"safeLatex"),i(297,"div",84),e(298," Recursion depth = 200, damping = 0.01, scale = 0.04 "),t()()(),i(299,"h2",67),e(300,"Data Selection Strategies"),t(),i(301,"div",68),e(302," Four strategies were used to select approximately 185 data points from the 300-point external dataset for augmenting the training set. Each strategy captures different properties of the data. "),t(),i(303,"div",80)(304,"app-window",86)(305,"div",56)(306,"div",87),e(307," Uniform Sampling Baseline "),t(),i(308,"div",72),e(309," Randomly samples 185 data points from the external dataset uniformly without replacement. Serves as the baseline strategy. "),t(),i(310,"div",88),e(311," Selected: 185 points "),t()()(),i(312,"app-window",89)(313,"div",56)(314,"div",87),e(315," Monte Carlo Dropout Uncertainty "),t(),i(316,"div",72),e(317," Uses MC Dropout (100 forward passes) to estimate prediction uncertainty. Points with uncertainty above a threshold are selected, targeting samples where the model is least confident. "),t(),i(318,"div",88),e(319," Selected: 183 points "),t()()(),i(320,"app-window",90)(321,"div",56)(322,"div",87),e(323," Structural Diversity Maximization "),t(),i(324,"div",72),e(325," Uses the MaxMin diversity algorithm from DeepChem to select the most structurally diverse molecules based on molecular fingerprints, maximizing coverage of chemical space. "),t(),i(326,"div",88),e(327," Selected: 185 points "),t()()(),i(328,"app-window",91)(329,"div",56)(330,"div",87),e(331," Gradient-Based Selection "),t(),i(332,"div",72),e(333," Selects points with positive influence scores (computed via LiSSA), meaning their inclusion is estimated to reduce the test loss. Points with negative influence are excluded. "),t(),i(334,"div",88),e(335," Selected: 185 points "),t()()()(),i(336,"h3",28),e(337," Strategy Comparison (Full Fine-Tuning) "),t(),i(338,"div",75),e(339," Each selection strategy was combined with the full training set and used to fine-tune from the best checkpoint. Lower RMSE indicates better predictive performance. "),t(),i(340,"div",76)(341,"app-window",92)(342,"div",93),m(343,"canvas",null,1),t()()(),i(345,"h2",67),e(346,"Parameter-Efficient Fine-Tuning"),t(),i(347,"div",68),e(348," Instead of updating all ~44.4M parameters during fine-tuning, PEFT techniques freeze most of the model and train only a small subset. Three PEFT methods were applied with each data selection strategy to evaluate their combined effectiveness. "),t(),i(349,"div",94)(350,"app-window",95)(351,"div",56)(352,"div",87),e(353," Bias-Term Fine-Tuning "),t(),i(354,"div",72),e(355," Only bias terms and the regression head are trainable. All weight matrices remain frozen, providing the simplest form of parameter-efficient adaptation. "),t(),i(356,"div",96)(357,"div",97),e(358,"Trainable: ~75K / 44.4M"),t(),i(359,"div",98),e(360,"Ratio: 0.17%"),t()(),i(361,"div",99)(362,"div",65)(363,"span"),e(364,"Learning Rate"),t(),m(365,"span",73),p(366,"safeLatex"),t(),i(367,"div",65)(368,"span"),e(369,"Classifier Dropout"),t(),i(370,"span",66),e(371,"0.2"),t()()(),m(372,"div",100),p(373,"safeHTML"),t()(),i(374,"app-window",101)(375,"div",56)(376,"div",87),e(377," Low-Rank Adaptation "),t(),i(378,"div",72),e(379," Injects trainable low-rank decomposition matrices into attention layers (Q, K, V) and FFN intermediate layers while keeping the original weights frozen. "),t(),i(380,"div",96)(381,"div",97),e(382,"Trainable: ~16.6M / 45M"),t(),i(383,"div",98),e(384,"Ratio: 37.4%"),t()(),i(385,"div",99)(386,"div",65)(387,"span"),e(388,"Rank"),t(),i(389,"span",66),e(390,"8"),t()(),i(391,"div",65)(392,"span"),e(393,"Alpha"),t(),i(394,"span",66),e(395,"16"),t()(),i(396,"div",65)(397,"span"),e(398,"Learning Rate"),t(),m(399,"span",73),p(400,"safeLatex"),t()(),m(401,"div",100),p(402,"safeHTML"),t()(),i(403,"app-window",102)(404,"div",56)(405,"div",87),e(406," Learned Rescaling Vectors "),t(),i(407,"div",72),e(408," Introduces per-layer learned scaling vectors that multiply the outputs of attention key, value, and FFN intermediate layers. The most parameter-efficient method tested. "),t(),i(409,"div",96)(410,"div",97),e(411,"Trainable: ~28K / 44.4M"),t(),i(412,"div",98),e(413,"Ratio: 0.06%"),t()(),i(414,"div",99)(415,"div",65)(416,"span"),e(417,"Learning Rate"),t(),m(418,"span",73),p(419,"safeLatex"),t(),i(420,"div",65)(421,"span"),e(422,"Initialization"),t(),i(423,"span",66),e(424,"Ones"),t()()(),m(425,"div",100),p(426,"safeHTML"),t()()(),i(427,"h3",28),e(428,"PEFT Trade-off Overview"),t(),i(429,"div",76)(430,"app-window",103)(431,"div",104),m(432,"canvas",null,2),t(),i(434,"div",105),e(435," Scores are normalised 0\u201310. Higher is better on each axis. "),t()()(),i(436,"h2",67),e(437,"Combined Results"),t(),i(438,"div",68),e(439," Each PEFT technique was combined with each data selection strategy, resulting in 15 experiment configurations (3 PEFT \xD7 5 selection methods). The combined training data consists of the original training set augmented with the selected external data points. "),t(),i(440,"div",76)(441,"app-window",106)(442,"div",93),m(443,"canvas",null,3),t(),i(445,"div",105),e(446," Lower MSE is better. Lines show how each PEFT method responds to different data selection strategies. "),t()()(),i(447,"div",94)(448,"app-window",107)(449,"div",108)(450,"div",65)(451,"div")(452,"strong"),e(453,"Strategy:"),t(),i(454,"div"),e(455,"Random Selection"),t(),i(456,"div",60),e(457,"0.17% trainable parameters"),t()(),i(458,"div")(459,"div",109),e(460,"0.477"),t(),i(461,"div",110),e(462,"MSE"),t()()()()(),i(463,"app-window",111)(464,"div",108)(465,"div",65)(466,"div")(467,"strong"),e(468,"Strategy:"),t(),i(469,"div"),e(470,"Random Selection"),t(),i(471,"div",60),e(472,"37.4% trainable parameters"),t()(),i(473,"div")(474,"div",112),e(475," 0.083 "),t(),i(476,"div",110),e(477,"MSE"),t()()()()(),i(478,"app-window",113)(479,"div",108)(480,"div",65)(481,"div")(482,"strong"),e(483,"Strategy:"),t(),i(484,"div"),e(485,"Random Selection"),t(),i(486,"div",60),e(487,"0.06% trainable parameters"),t()(),i(488,"div")(489,"div",109),e(490,"0.522"),t(),i(491,"div",110),e(492,"MSE"),t()()()()()(),i(493,"h2",67),e(494,"Key Findings"),t(),i(495,"div",80)(496,"app-window",114)(497,"ul",115)(498,"li"),e(499," Random selection unexpectedly yields the best MSE across all PEFT methods, likely influenced by seed-specific subset selection "),t(),i(500,"li"),e(501," Active learning (MC Dropout) is the second-best strategy for BitFit and LoRA, reinforcing the value of uncertainty-based selection "),t(),i(502,"li"),e(503," Influence-based selection performs worst for (IA)\xB3, highlighting method-specific sensitivity to data selection strategies "),t(),i(504,"li"),e(505," Structured data selection provides more reliable improvements than random selection due to lower variability across different runs "),t()()(),i(506,"app-window",116)(507,"ul",115)(508,"li"),e(509," LoRA achieves near full-fine-tuning performance with 37.4% trainable parameters "),t(),i(510,"li"),e(511," BitFit offers a good efficiency-performance trade-off with minimal implementation complexity "),t(),i(512,"li"),e(513," (IA)\xB3 is the most parameter-efficient (0.06%) but shows the largest performance gap "),t(),i(514,"li"),e(515," Unsupervised pre-training (MLM) provides consistent improvement across all configurations "),t()()()(),i(516,"h2",67),e(517,"Conclusion"),t(),i(518,"div",117),e(519," This project demonstrates that combining data selection with parameter-efficient fine-tuning enables effective molecular property prediction with significantly reduced computational requirements. Random selection paired with LoRA achieves the best performance overall (MSE 0.083), while BitFit and (IA)\xB3 provide competitive alternatives with only 0.17% and 0.06% of trainable parameters respectively on carefully selected subsets of external data. These findings suggest practical pathways for resource-conscious adaptation of large pre-trained chemical language models to specific molecular prediction tasks. "),t()()()),n&2&&(l("technologies",S(68,P)),s(61),l("innerHTML",f(62,28,a.phenolSvg),c),s(2),l("innerHTML",f(64,30,"\\text{Phenol (C}_6 \\text{H}_5 \\text{OH)}"),c),s(5),l("innerHTML",f(69,32,a.tolueneSvg),c),s(2),l("innerHTML",f(71,34,"\\text{Toluene (C}_6 \\text{H}_5 \\text{CH}_3 \\text{)}"),c),s(31),l("innerHTML",f(102,36,a.benzeneSvg),c),s(2),l("innerHTML",f(104,38,"\\text{Benzene (C}_6 \\text{H}_6 \\text{)}"),c),s(12),l("initialMinimized",!0),s(2),l("initialMinimized",!0),s(2),l("initialMinimized",!0),s(2),l("initialMinimized",!0),s(2),l("initialMinimized",!0),s(2),l("initialMinimized",!0),s(16),l("initialMinimized",!0),s(23),l("initialMinimized",!0),s(60),l("innerHTML",x(225,40,"1 \\times 10^{-4}",!1),c),s(31),l("innerHTML",x(256,43,"1 \\times 10^{-4}",!1),c),s(27),l("initialMinimized",!0),s(3),l("innerHTML",f(286,46,"\\mathcal{I}(z_i) = -\\nabla_\\theta \\mathcal{L}_{\\text{test}}^\\top \\, H_\\theta^{-1} \\, \\nabla_\\theta \\mathcal{L}(z_i)"),c),s(4),l("innerHTML",x(290,48,"H_\\theta",!1),c),s(3),l("initialMinimized",!0),s(3),l("innerHTML",f(296,51,"\\tilde{v}_{t+1} = v + (I - \\delta H_\\theta) \\tilde{v}_t"),c),s(70),l("innerHTML",x(366,53,"1 \\times 10^{-3}",!1),c),s(7),l("innerHTML",f(373,56,a.bitfitSvg),c),s(27),l("innerHTML",x(400,58,"1 \\times 10^{-4}",!1),c),s(2),l("innerHTML",f(402,61,a.loraSvg),c),s(17),l("innerHTML",x(419,63,"1 \\times 10^{-3}",!1),c),s(7),l("innerHTML",f(426,66,a.ia3Svg),c))},dependencies:[T,L,z,F],encapsulation:2})};export{j as DataSelectionPeftComponent};
