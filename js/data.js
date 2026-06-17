// ============================================================
//  DATA.JS — ПОЛНАЯ СТАТЬЯ (страницы 1-3)
//  ВСЕ ПРЕДЛОЖЕНИЯ БЕЗ ИСКЛЮЧЕНИЙ
// ============================================================

const ARTICLE_DATA = {
	sections: [
		// ============================================================
		//  ABSTRACT (страница 1) — 9 предложений
		// ============================================================
		{
			type: 'heading',
			level: 2,
			text: 'Abstract',
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'With the recent fast development of generative models, instruction-based image editing has shown great potential in generating high-quality images.',
					ru: 'В связи с недавним быстрым развитием генеративных моделей редактирование изображений на основе текстовых инструкций продемонстрировало высокий потенциал для генерации высококачественных изображений.',
				},
				{
					en: 'However, the quality of editing highly depends on carefully designed instructions, placing the burden of task decomposition and sequencing entirely on the user.',
					ru: 'Однако качество редактирования сильно зависит от детально проработанных инструкций, что полностью возлагает задачу декомпозиции и планирования последовательности шагов на пользователя.',
				},
				{
					en: 'To achieve autonomous image editing, we present PhotoAgent, a system that advances image editing through explicit aesthetic planning.',
					ru: 'Для реализации автономного редактирования изображений мы представляем PhotoAgent — систему, совершенствующую редактирование изображений за счет явного эстетического планирования.',
				},
				{
					en: 'Specifically, PhotoAgent formulates autonomous image editing as a long-horizon decision-making problem.',
					ru: 'В частности, PhotoAgent формулирует автономное редактирование изображений как задачу принятия решений на глубоком горизонте планирования.',
				},
				{
					en: 'It reasons over user aesthetic intent, plans multi-step editing actions via tree search, and iteratively refines results through closed-loop execution with memory and visual feedback, without requiring step-by-step user prompts.',
					ru: 'Он анализирует эстетический замысел пользователя, планирует многошаговые операции редактирования с помощью поиска по дереву и итеративно улучшает результаты в рамках замкнутого контура управления с поддержкой памяти и визуальной обратной связи, не требуя пошаговых подсказок от пользователя.',
				},
				{
					en: 'To support reliable evaluation in real-world scenarios, we introduce UGC-Edit, an aesthetic evaluation benchmark consisting of 7,000 photos and a learned aesthetic reward model.',
					ru: 'Для обеспечения надежной оценки в реальных сценариях мы вводим UGC-Edit — бенчмарк для эстетической оценки, состоящий из 7000 фотографий и обученной модели эстетического вознаграждения (aesthetic reward model).',
				},
				{
					en: 'We also construct a test set containing 1,017 photos to systematically assess autonomous photo editing performance.',
					ru: 'Мы также формируем тестовую выборку из 1017 фотографий для систематической оценки эффективности автономного редактирования.',
				},
				{
					en: 'Extensive experiments demonstrate that PhotoAgent consistently improves both instruction adherence and visual quality compared with baseline methods.',
					ru: 'Обширные эксперименты демонстрируют, что PhotoAgent последовательно улучшает как точность следования инструкциям, так и визуальное качество по сравнению с базовыми методами.',
				},
				{
					en: 'The project page is https://mdyao.github.io/PhotoAgent.',
					ru: 'Страница проекта: https://mdyao.github.io/PhotoAgent.',
				},
			],
		},

		// ============================================================
		//  1. INTRODUCTION (страница 1) — 18 предложений
		// ============================================================
		{
			type: 'heading',
			level: 2,
			text: '1. Introduction',
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'Recent instruction-based image editing models (InstructPix2Pix [5], SDXL [30], SD [33], GPT-4o [29], Flux.1 kontext [20], Bagel [13], etc.) enable amateur users to achieve professional photo edits through natural language commands (e.g., remove the passersby), rather than solely manipulating low-level sliders (e.g., brightness and color).',
					ru: 'Современные модели редактирования изображений на основе инструкций (InstructPix2Pix, SDXL, Stable Diffusion, GPT-4o, Flux.1 kontext, Bagel и др.) позволяют непрофессиональным пользователям выполнять редактирование на профессиональном уровне с помощью команд на естественном языке (например, «удалить прохожих»), избавляя от необходимости вручную настраивать низкоуровневые параметры (яркость, цвет и т. д.).',
				},
				{
					en: "This shift broadens the scope of computational photography, moving beyond fidelity to the captured scene toward fidelity to the user's aesthetic intent, thereby democratizing powerful photographic expression [24, 40].",
					ru: 'Этот сдвиг расширяет границы вычислительной фотографии, переходя от точности воспроизведения запечатленной сцены к точности соответствия эстетическому замыслу пользователя, тем самым делая мощные средства фотографического самовыражения общедоступными.',
				},
			],
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'Despite these advances, a critical bottleneck remains: these powerful models fundamentally rely on continuous user involvement, as shown in Fig. 1.',
					ru: 'Несмотря на эти успехи, сохраняется критическое «узкое место»: данные мощные модели принципиально требуют непрерывного участия пользователя, как показано на Рисунке 1.',
				},
				{
					en: "Their effectiveness largely depends on the user's ability to design precise and sequential instructions, which is difficult for amateur users.",
					ru: 'Эффективность их работы во многом зависит от способности пользователя составлять точные и последовательные инструкции, что представляет сложность для непрофессионалов.',
				},
				{
					en: 'This reliance introduces several fundamental limitations:',
					ru: 'Эта зависимость накладывает ряд фундаментальных ограничений:',
				},
			],
		},
		{
			type: 'list',
			items: [
				{
					en: '(1) Expertise barrier: Effective interaction requires expert knowledge. Amateur users often struggle either with designing articulate and precise editing instructions (e.g., decomposing "make my photo better" into detailed steps) or with evaluating whether editing results meet professional quality standards.',
					ru: '(1) Экспертный барьер: эффективное взаимодействие требует специальных знаний. Непрофессиональные пользователи часто испытывают трудности как с формулированием четких и точных инструкций по редактированию (например, с декомпозицией запроса «сделай мое фото лучше» на подробные шаги), так и с оценкой того, соответствуют ли результаты редактирования профессиональным стандартам качества.',
				},
				{
					en: '(2) Algorithm selection: Different editing tasks require different specialized models. A single model may not be sufficient for all tasks, so users need to switch between models to achieve the desired results.',
					ru: '(2) Выбор алгоритма: для разных задач редактирования требуются различные специализированные модели. Одной модели может быть недостаточно для всех задач, поэтому пользователям приходится вручную переключаться между ними для достижения желаемого результата.',
				},
				{
					en: '(3) Interaction complexity: These models often require users, even professional ones, to issue multiple iterative commands, which is inherently time-consuming and prevents full automation for batch processing.',
					ru: '(3) Сложность взаимодействия: данные модели зачастую требуют от пользователей, включая профессионалов, ввода множества итеративных команд, что трудоемко и препятствует полной автоматизации пакетной обработки.',
				},
			],
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'We argue that the next frontier in computational photography is not merely a single powerful editor or processor [5] [18] [40] [24], but an autonomous editing agent that can enhance photos without requiring expert-level operation.',
					ru: 'Мы утверждаем, что следующим рубежом в вычислительной фотографии является не просто создание очередного мощного редактора или процессора, а разработка автономного агента редактирования, способного улучшать фотографии без необходимости управления на экспертном уровне.',
				},
				{
					en: "Such an agent would emulate the decision-making process of a human photo editor, who strategically selects and sequences tools based on an assessment of the image's needs, and edits with specific tools.",
					ru: 'Подобный агент имитирует процесс принятия решений профессионального фоторедактора, который стратегически выбирает и распределяет инструменты на основе оценки потребностей конкретного изображения.',
				},
				{
					en: 'Recently, large vision and multimodal models (LVMs) [13] [23] [5] [40] have demonstrated remarkable perception and instruction-conditioned editing capabilities, making an autonomous editing agent feasible.',
					ru: 'В последнее время большие визуальные и мультимодальные модели (LVM) продемонстрировали выдающиеся способности к восприятию и редактированию по инструкциям, что делает создание автономного агента редактирования практически реализуемым.',
				},
			],
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'In this paper, we introduce PhotoAgent, a novel autonomous system that integrates large vision and multimodal models (LVMs) with a suite of editing tools into a coherent framework, enabling fully automated, high-quality photo editing.',
					ru: 'В данной работе мы представляем PhotoAgent — новую автономную систему, которая интегрирует большие визуальные и мультимодальные модели с набором инструментов редактирования в единую программную среду, обеспечивая полностью автоматизированное и высококачественное редактирование фотографий.',
				},
				{
					en: 'As illustrated in Fig. 1, PhotoAgent introduces exploratory visual aesthetic planning within a closed-loop framework.',
					ru: 'Как показано на Рисунке 1, PhotoAgent реализует исследовательское визуально-эстетическое планирование в рамках замкнутого контура управления.',
				},
				{
					en: 'Unlike open-loop systems (e.g., GenArtist [42]) that execute linear action sequences without feedback, PhotoAgent continuously evaluates its edits and strategically explores the editing space.',
					ru: 'В отличие от систем с разомкнутым контуром управления (например, GenArtist), которые выполняют линейные последовательности действий без обратной связи, PhotoAgent непрерывно оценивает результаты промежуточного редактирования и стратегически исследует пространство возможных действий.',
				},
				{
					en: 'This helps to avoid both short-sighted decisions and irrecoverable artifacts that commonly happen in greedy approaches, enabling coherent and high-quality results.',
					ru: 'Это позволяет избежать как недальновидных решений, так и неисправимых артефактов, характерных для жадных подходов, обеспечивая согласованные и высококачественные результаты.',
				},
				{
					en: 'In addition, PhotoAgent enables context editing, moving beyond the low-level adjustments (e.g., color, contrast, illumination) that existing photo-editing agents primarily perform [15, 22, 51].',
					ru: 'Кроме того, PhotoAgent поддерживает контекстное редактирование, выходя за рамки низкоуровневых корректировок (цвета, контраста, освещения), которыми ограничивается большинство существующих фотоагентов.',
				},
				{
					en: 'This is achieved through programmatic control over a rich library of editing actions and flexible editing tools, enabling semantically meaningful manipulations such as adding a sun to a dim sky, making the scene feel more vibrant and lively, or modifying objects in the scene.',
					ru: 'Это достигается за счет программного управления обширной библиотекой операций редактирования и гибких инструментов, что делает возможными семантически содержательные манипуляции — например, добавление солнца на тусклое небо для придания сцене яркости и живости или модификацию объектов в кадре.',
				},
			],
		},

		// ============================================================
		//  PAGE 2 — SYSTEM COMPONENTS (страница 2) — 12 предложений
		// ============================================================
		{
			type: 'heading',
			level: 2,
			text: 'Page 2 — System Architecture',
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'To achieve this, PhotoAgent consists of four core components: a perceiver, a planner, an executor, and an evaluator.',
					ru: 'Для реализации этого подхода PhotoAgent включает в себя четыре ключевых компонента: блок восприятия (perceiver), планировщик (planner), исполнитель (executor) и блок оценки (evaluator).',
				},
				{
					en: 'The process begins with a VLM-based perceiver (e.g., Qwen3-VL [2]) that interprets the input image and produces a set of semantically meaningful editing actions.',
					ru: 'Процесс начинается с блока восприятия на базе визуально-языковой модели (VLM, например Qwen3-VL), который интерпретирует входное изображение и генерирует набор семантически содержательных действий по редактированию.',
				},
				{
					en: 'These candidate actions are then passed to a Monte Carlo Tree Search (MCTS)-based planner [8] [6], which explores possible editing trajectories in a tree structure and selects the top-K most promising actions.',
					ru: 'Эти кандидаты на выполнение передаются планировщику на основе поиска по дереву Монте-Карло (MCTS), который исследует возможные траектории редактирования в древовидной структуре и выбирает K наиболее перспективных действий.',
				},
				{
					en: 'This exploratory mechanism ensures that our system embodies exploratory visual aesthetic planning, avoiding myopic decisions.',
					ru: 'Этот поисковый механизм гарантирует, что наша система реализует исследовательское визуально-эстетическое планирование, избегая сиюминутных (жадных) решений.',
				},
				{
					en: 'The selected actions are subsequently executed using either advanced image generation tools (e.g., Flux.1 Kontext [20]) or traditional image processing libraries (e.g., OpenCV/PIL [4]).',
					ru: 'Выбранные действия затем выполняются либо с помощью передовых моделей генерации изображений (например, Flux.1 Kontext), либо с использованием традиционных библиотек компьютерного зрения (OpenCV/PIL).',
				},
				{
					en: "Finally, the evaluator integrates feedback from multiple scoring modules, allowing only those actions that positively contribute to the image's aesthetic quality to pass.",
					ru: 'В завершение блок оценки объединяет обратную связь от нескольких оценочных модулей, пропуская только те действия, которые положительно сказываются на эстетическом качестве изображения.',
				},
				{
					en: 'By iterating through this perceive-plan-execute-evaluate cycle, PhotoAgent forms a fully closed-loop process, enabling autonomous and reliable progress toward the final editing goal.',
					ru: 'Итеративно повторяя цикл «восприятие — планирование — выполнение — оценка», PhotoAgent формирует полностью замкнутый контур управления, обеспечивая автономное и надежное продвижение к финальной цели редактирования.',
				},
			],
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'Additionally, one major challenge in this design is that existing image quality evaluation methods are insufficient for user-driven photo editing, also referred to as user-generated content (UGC).',
					ru: 'При этом одной из главных проблем архитектуры является то, что существующие методы оценки качества изображений малоприменимы для редактирования пользовательского контента (UGC).',
				},
				{
					en: 'The core issue lies in the composition of existing datasets, where existing datasets are overly generic, containing AI-generated images, screenshots, advertisements, and posters, rather than authentic user-captured photographs.',
					ru: 'Ключевая проблема кроется в составе существующих датасетов — они носят слишком обобщенный характер, включая сгенерированные ИИ изображения, скриншоты, рекламу и плакаты, в то время как аутентичные пользовательские фотографии в них практически отсутствуют.',
				},
				{
					en: 'To address this, we introduce UGC-Edit, a dataset of 7,000 real user photos annotated with human aesthetic scores.',
					ru: 'Для решения этой проблемы мы представляем UGC-Edit — датасет из 7000 реальных пользовательских фотографий, снабженных оценками эстетической привлекательности, выставленными людьми.',
				},
				{
					en: 'We also train a reward model on UGC-Edit, enabling reliable evaluation of aesthetic quality for multi-step image editing.',
					ru: 'Мы также обучаем модель вознаграждения (reward model) на UGC-Edit, что обеспечивает надежную оценку эстетического качества в процессе многошагового редактирования изображений.',
				},
				{
					en: 'Finally, to comprehensively evaluate the editing, we construct a test set of real photographs consisting of 1,017 images, on which our system achieves state-of-the-art results across quantitative metrics, qualitative assessment, and user studies.',
					ru: 'Наконец, для всестороннего тестирования мы формируем тестовую выборку из 1017 реальных фотографий, на которой наша система демонстрирует превосходные результаты (state-of-the-art) по количественным метрикам, качественной оценке и экспертным тестам с участием пользователей.',
				},
			],
		},

		// ============================================================
		//  PAGE 3 — CONTRIBUTIONS (страница 3) — 1 предложение + список из 4
		// ============================================================
		{
			type: 'heading',
			level: 2,
			text: 'Page 3 — Contributions & Related Work',
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'In summary, this work makes the following contributions:',
					ru: 'Вклад данной работы можно резюмировать следующим образом:',
				},
			],
		},
		{
			type: 'list',
			items: [
				{
					en: 'We propose PhotoAgent, an autonomous editing system that integrates a closed-loop architecture with a suite of editing and evaluation tools, enabling robust multi-step editing.',
					ru: 'Мы предлагаем PhotoAgent — автономную систему редактирования, которая сочетает в себе замкнутую архитектуру с набором инструментов редактирования и оценки, обеспечивая надежное многошаговое редактирование.',
				},
				{
					en: 'We introduce a visual aesthetic planner to explore sequences of editing actions over long horizons, enabling deliberate, goal-driven image editing.',
					ru: 'Мы представляем визуально-эстетический планировщик для исследования последовательностей действий по редактированию на глубоких горизонтах планирования, обеспечивающий целенаправленное и содержательное редактирование изображений.',
				},
				{
					en: 'We present the UGC-Edit dataset and introduce a reward model to support aesthetic research in autonomous image editing. We also introduce a test set of real photographs for evaluating autonomous photo editing.',
					ru: 'Мы представляем датасет UGC-Edit и обучаем на нем модель вознаграждения для поддержки исследований эстетики в области автономного редактирования изображений, а также предлагаем тестовую выборку реальных фотографий для оценки качества автономного редактирования.',
				},
				{
					en: 'Extensive experiments demonstrate that our complete system achieves significant improvements in editing quality.',
					ru: 'Обширные эксперименты демонстрируют, что предложенная нами система в полной конфигурации обеспечивает существенное повышение качества редактирования.',
				},
			],
		},

		// ============================================================
		//  2. RELATED WORK — Image Editing (страница 3) — 12 предложений
		// ============================================================
		{
			type: 'heading',
			level: 2,
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
				{
					en: 'Early pioneering works primarily leverage Generative Adversarial Networks (GANs) [16] or conditional encoder-decoder architectures for tasks like style transfer and attribute manipulation.',
					ru: 'Ранние новаторские работы в основном опирались на генеративно-состязательные сети (GAN) или условные архитектуры автокодировщиков (encoder-decoder) для решения таких задач, как перенос стиля и изменение атрибутов.',
				},
				{
					en: 'For example, CycleGAN [50] proposes unpaired image-to-image (I2I) translation, and StarGAN [11] enables multi-attribute manipulation within a single model.',
					ru: 'Например, CycleGAN предлагает непарный перенос изображений (image-to-image), а StarGAN обеспечивает манипулирование несколькими атрибутами в рамках единой модели.',
				},
				{
					en: 'However, these approaches are inherently limited since their editing capabilities are confined to the narrow distribution of their training data, which often struggle with open-vocabulary requests.',
					ru: 'Однако эти подходы по своей сути ограничены, поскольку их возможности редактирования замкнуты в узком распределении обучающих данных, что затрудняет обработку запросов со свободным словарем (open-vocabulary).',
				},
				{
					en: 'They frequently produce low-resolution or artifact-ridden outputs.',
					ru: 'Они часто генерируют результаты в низком разрешении или со значительными артефактами.',
				},
			],
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'A paradigm shift was ushered in by the advent of powerful diffusion models [28, 43] and their integration with natural language.',
					ru: 'Смена парадигмы произошла с появлением мощных диффузионных моделей и их интеграцией с обработкой естественного языка.',
				},
				{
					en: 'Models like Stable Diffusion [1] treat image editing as conditional image generation, where the input image serves as a foundational condition.',
					ru: 'Такие модели, как Stable Diffusion, рассматривают редактирование как задачу условной генерации, где исходное изображение выступает в качестве базового условия.',
				},
				{
					en: 'Recent methods (e.g., Prompt-to-Prompt [18], InstructPix2Pix [5]) manipulate the features in latent space to enable highly flexible editing following open-vocabulary instructions.',
					ru: 'Современные методы (например, Prompt-to-Prompt, InstructPix2Pix) манипулируют латентными признаками для обеспечения высокой гибкости редактирования на основе инструкций со свободным словарем.',
				},
				{
					en: 'This progress continues with next-generation architectures based on flow matching (e.g., Flux [20]) and the integration of powerful Multimodal Large Language Models (MLLMs) like GPT-4o [29], Show-o [44], Bagel [13], Nano Banana [17] and HunyuanImage-3.0 [7], which aim to tightly couple reasoning and generation.',
					ru: 'Этот прогресс продолжается в архитектурах следующего поколения на основе сопоставления потоков (flow matching, например Flux) и интеграции мощных мультимодальных больших языковых моделей (MLLM), таких как GPT-4o, Show-o, Bagel, Nano Banana и HunyuanImage-3.0, нацеленных на тесную интеграцию логического вывода и генерации.',
				},
				{
					en: 'Despite these remarkable advances, a critical limitation exists.',
					ru: 'Несмотря на столь впечатляющие успехи, сохраняется одно принципиальное ограничение.',
				},
				{
					en: 'These models act primarily as single-step, static executors.',
					ru: 'Эти модели функционируют преимущественно как одношаговые статические исполнители.',
				},
				{
					en: 'Their performance is highly sensitive to meticulously engineered, low-level prompts, placing the burden of designing instructions and evaluations on the amateur user.',
					ru: 'Качество их работы крайне чувствительно к тщательно проработанным низкоуровневым промптам, что перекладывает задачу по составлению инструкций и оценке результата на плечи непрофессионального пользователя.',
				},
				{
					en: 'These limitations prevent the method from handling complex, autonomous multi-step editing tasks, highlighting the need for a higher-level, planning-based framework.',
					ru: 'Данные ограничения препятствуют эффективному решению сложных многошаговых задач автономного редактирования, подчеркивая острую необходимость в разработке высокоуровневых систем планирования.',
				},
			],
		},

		// ============================================================
		//  2. RELATED WORK — Planning with Autonomous Agents (страница 3) — 9 предложений
		// ============================================================
		{
			type: 'heading',
			level: 3,
			text: 'Planning with Autonomous Agents',
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'To overcome the above limitations, a promising direction is to design an autonomous agent framework capable of multi-step planning and execution.',
					ru: 'Для преодоления указанных ограничений перспективным направлением является создание архитектур автономных агентов, способных к многошаговому планированию и выполнению действий.',
				},
				{
					en: 'Early works such as AlphaGo [38] employ planning algorithms like Monte Carlo Tree Search (MCTS) to navigate state spaces.',
					ru: 'Ранние работы, такие как AlphaGo, применяли алгоритмы планирования — в частности, поиск по дереву Монте-Карло (MCTS) — для навигации в пространстве состояний.',
				},
				{
					en: "Recently, LLM-based agents leverage LLM's reasoning capability to decompose tasks into sequences of actions (e.g., HuggingGPT [36], ReAct [47], and Voyager [39]).",
					ru: 'В последнее время агенты на базе LLM используют возможности рассуждения больших языковых моделей для декомпозиции задач на последовательности действий (например, HuggingGPT, ReAct и Voyager).',
				},
			],
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'Within computer vision, works have explored integrating planning into image editing tasks.',
					ru: 'В сфере компьютерного зрения в ряде работ исследовалась интеграция механизмов планирования в задачи редактирования изображений.',
				},
				{
					en: 'Some approaches, such as JarvisArt [24], MonetGPT [15], and PhotoArtAgent [9] leverage an LLM as a planner to parse a complex instruction into a sequence of calls to specialized image processing software.',
					ru: 'Некоторые подходы, такие как JarvisArt, MonetGPT и PhotoArtAgent, задействуют LLM в качестве планировщика для трансляции сложных инструкций в последовательность вызовов специализированного ПО для обработки изображений.',
				},
				{
					en: 'However, existing methods mainly focus on low-level editing tasks, such as color, tone, or exposure adjustments using procedural software tools like Lightroom or GIMP, which are limited to pure retouching.',
					ru: 'Однако существующие методы в основном ориентированы на низкоуровневые задачи (корректировка цвета, тона или экспозиции) с использованием процедурных программных пакетов типа Lightroom или GIMP, возможности которых ограничены лишь базовой ретушью.',
				},
			],
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'More recent researches begin to explore directly applying MCTS and other search strategies to the text-to-image (T2I) generation process itself, building a search tree in the latent or textual space to find sequences of actions that better satisfy a high-level goal [37].',
					ru: 'Более современные исследования направлены на прямое применение MCTS и иных стратегий поиска к самому процессу генерации изображений по тексту (text-to-image), выстраивая дерево поиска в латентном или текстовом пространстве для нахождения оптимальных цепочек действий, удовлетворяющих глобальной цели.',
				},
				{
					en: 'However, existing methods [15, 22, 51] have no planning capability for instruction-based image editing.',
					ru: 'При этом существующие методы не поддерживают возможность планирования для редактирования изображений на основе текстовых инструкций.',
				},
				{
					en: 'Our approach addresses this through an MCTS planner that considers internal simulation with external execution.',
					ru: 'Наш подход решает эту проблему за счет планировщика MCTS, совмещающего внутреннюю симуляцию с внешним выполнением.',
				},
				{
					en: 'We also employ a learned reward model trained on user preferences to guide the search.',
					ru: 'Для направления поиска мы задействуем модель вознаграждения, обученную на основе предпочтений реальных пользователей.',
				},
				{
					en: 'This combination enables robust planning with a diverse toolset and is supported by a new editing-specific benchmark for evaluation.',
					ru: 'Такое сочетание обеспечивает надежное планирование с использованием разнородного набора инструментов и опирается на новый специализированный бенчмарк для проведения оценки.',
				},
			],
		},

		// ============================================================
		//  2. RELATED WORK — Image Evaluation (страница 3) — 8 предложений
		// ============================================================
		{
			type: 'heading',
			level: 3,
			text: 'Image Evaluation',
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: "In an automated image editing pipeline, the evaluator is important, as it defines the reward function that guides the agent's actions and determines the final output.",
					ru: 'В автоматизированном конвейере редактирования блок оценки (evaluator) играет ключевую роль, так как он определяет функцию вознаграждения, направляющую действия агента и задающую характеристики итогового результата.',
				},
				{
					en: 'Traditional full-reference image quality metrics, such as Peak Signal-to-Noise Ratio (PSNR) and Structural Similarity Index (SSIM) [41], are not suited for this open-world setting.',
					ru: 'Традиционные метрики качества изображений с полным эталоном (full-reference), такие как пиковое отношение сигнал/шум (PSNR) и индекс структурного сходства (SSIM), неприменимы в условиях открытой среды.',
				},
				{
					en: 'They require a ground-truth target image, which is obviously impossible for creative editing tasks.',
					ru: 'Для их расчета требуется эталонное целевое изображение, что заведомо исключено при решении творческих задач редактирования.',
				},
			],
		},
		{
			type: 'paragraph',
			sentences: [
				{
					en: 'The community then turns to no-reference metrics, including distribution-based measures like Fréchet Inception Distance (FID) [19], aesthetic predictors [14], or CLIP-based image-text alignment scores [32].',
					ru: 'В связи с этим сообщество перешло к метрикам без эталона (no-reference), включая распределительные оценки вроде расстояния Фреше (FID), эстетические предикторы и метрики семантического соответствия текста и изображения на базе CLIP.',
				},
				{
					en: 'While a step forward, these metrics are often too broad to provide reliable, fine-grained signals for specific editing tasks on user-generated content (UGC).',
					ru: 'Несмотря на очевидный прогресс, данные метрики слишком обобщены, чтобы давать надежные детализированные сигналы для конкретных сценариев редактирования пользовательского контента (UGC).',
				},
				{
					en: 'They cannot capture the subtle quality differences that are crucial in specific image editing tasks, such as aesthetic-oriented editing.',
					ru: 'Они не способны улавливать тонкие различия в качестве, критически важные для специализированных задач — например, эстетически ориентированного редактирования.',
				},
				{
					en: 'To address this limitation, we introduce a specialized UGC evaluation dataset and train a reward model on the dataset.',
					ru: 'Для преодоления этого ограничения мы вводим специализированный датасет для оценки пользовательского контента и обучаем на нем собственную модель вознаграждения.',
				},
				{
					en: 'The reward model is adopted from a pretrained vision-language model (VLM) that contains inherent knowledge.',
					ru: 'Архитектура модели вознаграждения базируется на предобученной визуально-языковой модели (VLM), обладающей глубокими внутренними знаниями о предметной области.',
				},
			],
		},
	],
}
