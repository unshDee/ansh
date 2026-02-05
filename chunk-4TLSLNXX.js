import{a as h,b as x}from"./chunk-YJJZCYPS.js";import{a as f}from"./chunk-ARLT7E4K.js";import{a as k}from"./chunk-MBTDRT46.js";import"./chunk-CT3WOVP3.js";import"./chunk-KD5KPFK4.js";import{Ba as l,Ga as n,Oa as m,Xa as o,bb as i,cb as t,db as r,nb as e,qb as u,sb as s,tb as a}from"./chunk-M4WCLFPR.js";var g=()=>["MoleculeNet Lipophilicity","MolFormer","PyTorch","RDKit","DeepChem","Transformers"],y=class c{benzeneSvg=`
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
  </svg>`;static \u0275fac=function(d){return new(d||c)};static \u0275cmp=m({type:c,selectors:[["app-data-selection-peft"]],decls:136,vars:26,consts:[["projectTitle","Data Selection and PEFT","note","Course Project - Neural Networks: Theory & Implementation","demo","Google Colab","demoLink","https://colab.research.google.com/",3,"technologies"],["description",""],[1,"italic"],["content",""],[1,"grid","grid-cols-4","gap-4"],[1,"font-serif","text-xl","text-justify","col-span-4","lg:col-span-3"],[1,"text-4xl"],["href","https://moleculenet.org/datasets-1","target","_blank",1,"underline","underline-offset-4","decoration-1"],[1,"col-span-4","lg:col-span-1"],[1,"text-3xl","my-4","lg:my-0","lg:text-lg","lg:font-light"],[1,"grid","grid-cols-2","gap-2"],["windowTitle","Lipophilicity",1,"col-span-1","lg:col-span-2"],[1,"list-disc","pl-4"],[1,"font-bold"],["windowTitle","External",1,"col-span-1","lg:col-span-2"],[1,"text-3xl","my-4","mt-8"],["href","https://arxiv.org/abs/1703.00564","target","_blank",1,"group"],[1,"font-extralight","transform","duration-300","ease-in-out","group-hover:text-(--color-primary)","group-hover:translate-3"],[1,"font-serif","text-justify"],[1,"text-xl"],[1,"font-serif","text-xl"],[1,"font-sans","text-2xl","my-4"],[1,"grid","grid-cols-2","gap-y-4","gap-x-8","mt-4"],[1,"col-span-2","lg:col-span-1"],[1,"font-sans","text-2xl","mb-4"],["href","https://en.wikipedia.org/wiki/Simplified_Molecular_Input_Line_Entry_System",1,"underline","underline-offset-4","decoration-1"],[1,"font-sans","col-span-2","lg:col-span-1"],["windowTitle","Phenol is Oc1ccccc1"],[1,"flex","flex-col","items-center"],[3,"innerHTML"],["windowTitle","Toluene is Cc1ccccc1"],[1,"grid","grid-cols-2","gap-4","gap-x-8","mt-8"],[1,"col-span-2","lg:col-span-1","font-serif","text-xl","text-justify"],[1,"font-sans","text-3xl","mb-4"],[1,"mt-2"],["windowTitle","Scaffold"],[1,"text-justify"],[1,"font-serif","text-xl","mb-4"],[1,"relative"],[1,"grid","grid-cols-6","grid-rows-2","gap-1"],["windowTitle","random",1,"col-span-3","lg:col-span-2",3,"initialMinimized"],["windowTitle","scaffold",1,"col-span-3","lg:col-span-2",3,"initialMinimized"],["windowTitle","weight",1,"col-span-3","lg:col-span-2",3,"initialMinimized"],["windowTitle","maxmin",1,"col-span-3","lg:col-span-2",3,"initialMinimized"],["windowTitle","butina",1,"col-span-3","lg:col-span-2",3,"initialMinimized"],["windowTitle","fingerprint",1,"col-span-3","lg:col-span-2",3,"initialMinimized"],[1,"text-2xl","my-4","mt-8"],[1,"font-serif","text-xl","text-justify"],["href","https://research.ibm.com/blog/molecular-transformer-discovery",1,"underline","underline-offset-4","decoration-1","italic"]],template:function(d,p){d&1&&(i(0,"app-project-template",0)(1,"div",1),e(2," Selecting "),i(3,"span",2),e(4,"Influential"),t(),e(5," Data for different Parameter-Efficient Fine-Tuning Techniques "),t(),i(6,"div",3)(7,"div",4)(8,"div",5)(9,"span",6),e(10,"T"),t(),e(11,'his course project for "Neural Networks: Theory and Implementation" addresses different data selection strategies for Parameter-Efficient Fine-Tuning (PEFT) in molecular property prediction. By combining the best data selection method to select points from an external dataset with BitFit, LoRA, and (IA)'),i(12,"sup"),e(13,"3"),t(),e(14," techniques, the project fine-tunes MolFormer on the "),i(15,"a",7),e(16,"MoleculeNet Lipophilicity dataset"),t(),e(17," using criteria based on gradient norms, embedding distances, and uncertainty estimates. Results demonstrate reduced computational requirements while maintaining comparable predictive performance to full dataset fine-tuning, enabling more resource-conscious adaptation of pre-trained models to specific chemical prediction tasks. "),t(),i(18,"div",8)(19,"h2",9),e(20,"Datasets"),t(),i(21,"div",10)(22,"app-window",11)(23,"ul",12)(24,"li"),e(25,"4200 data points"),t(),i(26,"li",13),e(27,"2444 unique scaffolds"),t()()(),i(28,"app-window",14)(29,"ul",12)(30,"li"),e(31,"300 data points"),t()()()()()(),i(32,"h2",15)(33,"a",16),e(34,"MoleculeNet Benchmark"),i(35,"sup",17),e(36,"\u2197"),t()()(),i(37,"div",18)(38,"div",19)(39,"a",7),e(40,"MoleculeNet"),t(),e(41," contains various datasets for molecular property prediction tasks. The datasets are used to benchmark machine learning models for drug discovery and molecular property prediction. The datasets are curated from various sources and are used to evaluate the performance of models on different molecular property prediction tasks "),t(),i(42,"div",20)(43,"h3",21),e(44,"Lipophilicity Dataset"),t(),e(45," The "),i(46,"span",2),e(47,"Lipophilicity dataset"),t(),e(48," contains experimental lipophilicity values for 4200 molecules represented as SMILES strings. "),t(),i(49,"div",22)(50,"div",23)(51,"h3",24),e(52,"SMILES"),t(),i(53,"div",19),e(54," Simplified Molecular Input Line Entry System (SMILES) is a line notation for representing molecules and reactions. It encodes molecular structures as line notations using ASCII strings, which can be used to generate molecular graphs. These notations follow a "),i(55,"a",25),e(56,"certain set of rules"),t(),e(57," which can be parsed to generate molecular structures. "),t()(),i(58,"div",26)(59,"app-window",27)(60,"div",28),r(61,"div",29),s(62,"safeHTML"),r(63,"div",29),s(64,"safeLatex"),t()()(),i(65,"div",26)(66,"app-window",30)(67,"div",28),r(68,"div",29),s(69,"safeHTML"),r(70,"div",29),s(71,"safeLatex"),t()()(),i(72,"div",23)(73,"h3",24),e(74,"Lipophilicity Values"),t(),i(75,"div",19),e(76," Lipophilicity is a measure of the ability of a chemical compound to dissolve in fats, oils, and lipids. It is a key property in drug discovery and design, influencing the absorption, distribution, metabolism, and excretion of drugs. The dataset contains experimental lipophilicity values for the corresponding SMILES strings. "),t()()()(),i(77,"div",31)(78,"div",32)(79,"h3",33),e(80,"What are Scaffolds?"),t(),i(81,"span",2),e(82,"Scaffolds"),t(),e(83," are the core structures of molecules that are common across different molecules. They are used to represent the core structure of a molecule and are used to group molecules based on their structural similarity. Scaffolds are used in cheminformatics to analyze and compare molecular structures. "),i(84,"div",34),e(85," For examples, the compounds - "),i(86,"span",2),e(87,"benzene"),t(),e(88,", "),i(89,"span",2),e(90,"toluene"),t(),e(91,", and "),i(92,"span",2),e(93,"phenol"),t(),e(94," have the same scaffold - "),i(95,"span",2),e(96,"benzene"),t(),e(97,". "),t()(),i(98,"div",23)(99,"app-window",35)(100,"div",28),r(101,"div",29),s(102,"safeHTML"),r(103,"div",29),s(104,"safeLatex"),t()()()(),i(105,"h2",15),e(106,"Data Splitting"),t(),i(107,"div",36)(108,"div",37),e(109," For datasets containing molecular structures, it is essential to split the such that it generalizes well to novel molecules. The dataset splits might contain overlapping scaffolds, which can lead to data leakage and overfitting. "),r(110,"br"),i(111,"div",34),e(112," Different data splitting strategies were tested and the best performing one was selected to be used for the PEFT experiments. The main criteria for selecting the splitting strategy was to ensure there were no overlapping scaffolds between the sets. The following splits from DeepChem were tested: "),t()(),i(113,"div",38)(114,"div",39)(115,"app-window",40),e(116," Random data splits "),t(),i(117,"app-window",41),e(118," Scaffold-based data splits (Bemis-Murcko scaffold) "),t(),i(119,"app-window",42),e(120," Molecular weight splits "),t(),i(121,"app-window",43),e(122," Diversity splits based on MaxMin diversity algorithm "),t(),i(123,"app-window",44),e(124," Data splits based on Butina clustering of a bulk Tanimoto fingerprint matrix "),t(),i(125,"app-window",45),e(126," Splits based on Tanimoto similar between ECFP4 fingerprints "),t()()(),i(127,"h3",46),e(128,"Observations"),t(),r(129,"div",20),t(),i(130,"h2",15),e(131,"MolFormer"),t(),i(132,"div",47)(133,"a",48),e(134,"MolFormer"),t(),e(135," is a transformer-based model for molecular property prediction. It is pre-trained on a large corpus of molecular data and fine-tuned on specific datasets to predict various molecular properties. MolFormer uses SMILES strings as input and predicts the corresponding property values. "),t()()()),d&2&&(o("technologies",u(25,g)),n(61),o("innerHTML",a(62,13,p.phenolSvg),l),n(2),o("innerHTML",a(64,15,"\\text{Phenol (C}_6 \\text{H}_5 \\text{OH)}"),l),n(5),o("innerHTML",a(69,17,p.tolueneSvg),l),n(2),o("innerHTML",a(71,19,"\\text{Toluene (C}_6 \\text{H}_5 \\text{CH}_3 \\text{)}"),l),n(31),o("innerHTML",a(102,21,p.benzeneSvg),l),n(2),o("innerHTML",a(104,23,"\\text{Benzene (C}_6 \\text{H}_6 \\text{)}"),l),n(12),o("initialMinimized",!0),n(2),o("initialMinimized",!0),n(2),o("initialMinimized",!0),n(2),o("initialMinimized",!0),n(2),o("initialMinimized",!0),n(2),o("initialMinimized",!0))},dependencies:[f,k,h,x],encapsulation:2})};export{y as DataSelectionPeftComponent};
