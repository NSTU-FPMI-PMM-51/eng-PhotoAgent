// ============================================================
//  DATA.JS — содержание статьи, разбитое по абзацам
//  Каждый абзац — объект с полями:
//    type: 'paragraph' | 'heading' | 'list' | 'list-item'
//    content: массив предложений (для paragraph)
//    или текст (для heading/list-item)
// ============================================================

const ARTICLE_DATA = {
	// -------- ЗАГОЛОВОК СТАТЬИ (отображается отдельно) --------
	title: 'PhotoAgent: Autonomous Photo Editing with Aesthetic Planning',

	// -------- СОДЕРЖАНИЕ --------
	sections: [
		// ========== ABSTRACT ==========
		{
			type: 'heading',
			level: 2,
			text: 'Abstract',
		},
		{
			type: 'paragraph',
			sentences: [
				'With the recent fast development of generative models, instruction-based image editing has shown great potential in generating high-quality images.',
				'However, the quality of editing highly depends on carefully designed instructions, placing the burden of task decomposition and sequencing entirely on the user.',
				'To achieve autonomous image editing, we present PhotoAgent, a system that advances image editing through explicit aesthetic planning.',
				'Specifically, PhotoAgent formulates autonomous image editing as a long-horizon decision-making problem.',
				'It reasons over user aesthetic intent, plans multi-step editing actions via tree search, and iteratively refines results through closed-loop execution with memory and visual feedback, without requiring step-by-step user prompts.',
				'To support reliable evaluation in real-world scenarios, we introduce UGC-Edit, an aesthetic evaluation benchmark consisting of 7,000 photos and a learned aesthetic reward model.',
				'We also construct a test set containing 1,017 photos to systematically assess autonomous photo editing performance.',
				'Extensive experiments demonstrate that PhotoAgent consistently improves both instruction adherence and visual quality compared with baseline methods.',
				'The project page is https://mdayao.github.io/PhotoAgent.',
			],
		},

		// ========== 1. INTRODUCTION ==========
		{
			type: 'heading',
			level: 2,
			text: '1. Introduction',
		},
		{
			type: 'paragraph',
			sentences: [
				'Recent instruction-based image editing models (InstructPix2Pix [5], SDXL [30], SD [33], GPT-4o [29], Flux.1 kontext [20], Bagel [13], etc.) enable amateur users to achieve professional photo edits through natural language commands (e.g., remove the passersby), rather than solely manipulating low-level sliders (e.g., brightness and color).',
				"This shift broadens the scope of computational photography, moving beyond fidelity to the captured scene toward fidelity to the user's aesthetic intent, thereby democratizing powerful photographic expression [24, 40].",
			],
		},
		{
			type: 'paragraph',
			sentences: [
				'Despite these advances, a critical bottleneck remains: these powerful models fundamentally rely on continuous user involvement, as shown in Fig. 1.',
				"Their effectiveness largely depends on the user's ability to design precise and sequential instructions, which is difficult for amateur users.",
				'This reliance introduces several fundamental limitations:',
			],
		},
		{
			type: 'list',
			items: [
				'(1) Expertise barrier: Effective interaction requires expert knowledge. Amateur users often struggle either with designing articulate and precise editing instructions (e.g., decomposing "make my photo better" into detailed steps) or with evaluating whether editing results meet professional quality standards.',
				'(2) Algorithm selection: Different editing tasks require different specialized models. A single model may not be sufficient for all tasks, so users need to switch between models to achieve the desired results.',
				'(3) Interaction complexity: These models often require users, even professional ones, to issue multiple iterative commands, which is inherently time-consuming and prevents full automation for batch processing.',
			],
		},
		{
			type: 'paragraph',
			sentences: [
				'We argue that the next frontier in computational photography is not merely a single powerful editor or processor [5] [18] [40] [24], but an autonomous editing agent that can enhance photos without requiring expert-level operation.',
				"Such an agent would emulate the decision-making process of a human photo editor, who strategically selects and sequences tools based on an assessment of the image's needs, and edits with specific tools.",
				'Recently, large vision and multimodal models (LVMs) [13] [23] [5] [40] have demonstrated remarkable perception and instruction-conditioned editing capabilities, making an autonomous editing agent feasible.',
			],
		},
		{
			type: 'paragraph',
			sentences: [
				'In this paper, we introduce PhotoAgent, a novel autonomous system that integrates large vision and multimodal models (LVMs) with a suite of editing tools into a coherent framework, enabling fully automated, high-quality photo editing.',
				'As illustrated in Fig. 1, PhotoAgent introduces exploratory visual aesthetic planning within a closed-loop framework.',
				'Unlike open-loop systems (e.g., GenArtist [42]) that execute linear action sequences without feedback, PhotoAgent continuously evaluates its edits and strategically explores the editing space.',
				'This helps to avoid both short-sighted decisions and irrecoverable artifacts that commonly happen in greedy approaches, enabling coherent and high-quality results.',
				'In addition, PhotoAgent enables context editing, moving beyond the low-level adjustments (e.g., color, contrast, illumination) that existing photo-editing agents primarily perform [15, 22, 51].',
				'This is achieved through programmatic control over a rich library of editing actions and flexible editing tools, enabling semantically meaningful manipulations such as adding a sun to a dim sky, making the scene feel more vibrant and lively, or modifying objects in the scene.',
			],
		},

		// ========== PAGE 2 — SYSTEM COMPONENTS ==========
		{
			type: 'heading',
			level: 2,
			text: 'Page 2 — System Architecture',
		},
		{
			type: 'paragraph',
			sentences: [
				'To achieve this, PhotoAgent consists of four core components: a perceiver, a planner, an executor, and an evaluator.',
				'The process begins with a VLM-based perceiver (e.g., Qwen3-VL [2]) that interprets the input image and produces a set of semantically meaningful editing actions.',
				'These candidate actions are then passed to a Monte Carlo Tree Search (MCTS)-based planner [8] [6], which explores possible editing trajectories in a tree structure and selects the top-K most promising actions.',
				'This exploratory mechanism ensures that our system embodies exploratory visual aesthetic planning, avoiding myopic decisions.',
				'The selected actions are subsequently executed using either advanced image generation tools (e.g., Flux.1 Kontext [20]) or traditional image processing libraries (e.g., OpenCV/PIL [4]).',
				"Finally, the evaluator integrates feedback from multiple scoring modules, allowing only those actions that positively contribute to the image's aesthetic quality to pass.",
				'By iterating through this perceive-plan-execute-evaluate cycle, PhotoAgent forms a fully closed-loop process, enabling autonomous and reliable progress toward the final editing goal.',
			],
		},
		{
			type: 'paragraph',
			sentences: [
				'Additionally, one major challenge in this design is that existing image quality evaluation methods are insufficient for user-driven photo editing, also referred to as user-generated content (UGC).',
				'The core issue lies in the composition of existing datasets, where existing datasets are overly generic, containing AI-generated images, screenshots, advertisements, and posters, rather than authentic user-captured photographs.',
				'To address this, we introduce UGC-Edit, a dataset of 7,000 real user photos annotated with human aesthetic scores.',
				'We also train a reward model on UGC-Edit, enabling reliable evaluation of aesthetic quality for multi-step image editing.',
				'Finally, to comprehensively evaluate the editing, we construct a test set of real photographs consisting of 1,017 images, on which our system achieves state-of-the-art results across quantitative metrics, qualitative assessment, and user studies.',
			],
		},

		// ========== PAGE 3 — CONTRIBUTIONS + RELATED WORK ==========
		{
			type: 'heading',
			level: 2,
			text: 'Page 3 — Contributions & Related Work',
		},
		{
			type: 'paragraph',
			sentences: ['In summary, this work makes the following contributions:'],
		},
		{
			type: 'list',
			items: [
				'We propose PhotoAgent, an autonomous editing system that integrates a closed-loop architecture with a suite of editing and evaluation tools, enabling robust multi-step editing.',
				'We introduce a visual aesthetic planner to explore sequences of editing actions over long horizons, enabling deliberate, goal-driven image editing.',
				'We present the UGC-Edit dataset and introduce a reward model to support aesthetic research in autonomous image editing. We also introduce a test set of real photographs for evaluating autonomous photo editing.',
				'Extensive experiments demonstrate that our complete system achieves significant improvements in editing quality.',
			],
		},
		{
			type: 'heading',
			level: 3,
			text: '2. Related Work',
		},
		{
			type: 'heading',
			level: 3,
			text: 'Image Editing',
		},
		{
			type: 'paragraph',
			sentences: [
				'Early pioneering works primarily leverage Generative Adversarial Networks (GANs) [16] or conditional encoder-decoder architectures for tasks like style transfer and attribute manipulation.',
				'For example, CycleGAN [50] proposes unpaired image-to-image (I2I) translation, and StarGAN [11] enables multi-attribute manipulation within a single model.',
				'However, these approaches are inherently limited since their editing capabilities are confined to the narrow distribution of their training data, which often struggle with open-vocabulary requests.',
				'They frequently produce low-resolution or artifact-ridden outputs.',
			],
		},
		{
			type: 'paragraph',
			sentences: [
				'A paradigm shift was ushered in by the advent of powerful diffusion models [28, 43] and their integration with natural language.',
				'Models like Stable Diffusion [1] treat image editing as conditional image generation, where the input image serves as a foundational condition.',
				'Recent methods (e.g., Prompt-to-Prompt [18], InstructPix2Pix [5]) manipulate the features in latent space to enable highly flexible editing following open-vocabulary instructions.',
				'This progress continues with next-generation architectures based on flow matching (e.g., Flux [20]) and the integration of powerful Multimodal Large Language Models (MLLMs) like GPT-4o [29], Show-o [44], Bagel [13], Nano Banana [17] and HunyuanImage-3.0 [7], which aim to tightly couple reasoning and generation.',
				'Despite these remarkable advances, a critical limitation exists.',
				'These models act primarily as single-step, static executors.',
				'Their performance is highly sensitive to meticulously engineered, low-level prompts, placing the burden of designing instructions and evaluations on the amateur user.',
				'These limitations prevent the method from handling complex, autonomous multi-step editing tasks, highlighting the need for a higher-level, planning-based framework.',
			],
		},
		{
			type: 'heading',
			level: 3,
			text: 'Planning with Autonomous Agents',
		},
		{
			type: 'paragraph',
			sentences: [
				'To overcome the above limitations, a promising direction is to design an autonomous agent framework capable of multi-step planning and execution.',
				'Early works such as AlphaGo [38] employ planning algorithms like Monte Carlo Tree Search (MCTS) to navigate state spaces.',
				"Recently, LLM-based agents leverage LLM's reasoning capability to decompose tasks into sequences of actions (e.g., HuggingGPT [36], ReAct [47], and Voyager [39]).",
			],
		},
		{
			type: 'paragraph',
			sentences: [
				'Within computer vision, works have explored integrating planning into image editing tasks.',
				'Some approaches, such as JarvisArt [24], MonetGPT [15], and PhotoArtAgent [9] leverage an LLM as a planner to parse a complex instruction into a sequence of calls to specialized image processing software.',
				'However, existing methods mainly focus on low-level editing tasks, such as color, tone, or exposure adjustments using procedural software tools like Lightroom or GIMP, which are limited to pure retouching.',
			],
		},
		{
			type: 'paragraph',
			sentences: [
				'More recent researches begin to explore directly applying MCTS and other search strategies to the text-to-image (T2I) generation process itself, building a search tree in the latent or textual space to find sequences of actions that better satisfy a high-level goal [37].',
				'However, existing methods [15, 22, 51] have no planning capability for instruction-based image editing.',
				'Our approach addresses this through an MCTS planner that considers internal simulation with external execution.',
				'We also employ a learned reward model trained on user preferences to guide the search.',
				'This combination enables robust planning with a diverse toolset and is supported by a new editing-specific benchmark for evaluation.',
			],
		},
		{
			type: 'heading',
			level: 3,
			text: 'Image Evaluation',
		},
		{
			type: 'paragraph',
			sentences: [
				"In an automated image editing pipeline, the evaluator is important, as it defines the reward function that guides the agent's actions and determines the final output.",
				'Traditional full-reference image quality metrics, such as Peak Signal-to-Noise Ratio (PSNR) and Structural Similarity Index (SSIM) [41], are not suited for this open-world setting.',
				'They require a ground-truth target image, which is obviously impossible for creative editing tasks.',
			],
		},
		{
			type: 'paragraph',
			sentences: [
				'The community then turns to no-reference metrics, including distribution-based measures like Fréchet Inception Distance (FID) [19], aesthetic predictors [14], or CLIP-based image-text alignment scores [32].',
				'While a step forward, these metrics are often too broad to provide reliable, fine-grained signals for specific editing tasks on user-generated content (UGC).',
				'They cannot capture the subtle quality differences that are crucial in specific image editing tasks, such as aesthetic-oriented editing.',
				'To address this limitation, we introduce a specialized UGC evaluation dataset and train a reward model on the dataset.',
				'The reward model is adopted from a pretrained vision-language model (VLM) that contains inherent knowledge.',
			],
		},
	],
}
