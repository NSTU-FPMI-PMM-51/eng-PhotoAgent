// ============================================================
//  DATA.JS — все предложения с переводами
//  структура: [ { en: "...", ru: "..." }, ... ]
// ============================================================

const SENTENCE_DATA = [
	// ---- ABSTRACT ----
	{
		en: 'With the recent fast development of generative models, instruction-based image editing has shown great potential in generating high-quality images.',
		ru: 'В связи с недавним быстрым развитием генеративных моделей, инструктивно-ориентированное редактирование изображений показало большой потенциал в создании высококачественных изображений.',
	},
	{
		en: 'However, the quality of editing highly depends on carefully designed instructions, placing the burden of task decomposition and sequencing entirely on the user.',
		ru: 'Однако качество редактирования сильно зависит от тщательно продуманных инструкций, что возлагает задачу декомпозиции и последовательного планирования целиком на пользователя.',
	},
	{
		en: 'To achieve autonomous image editing, we present PhotoAgent, a system that advances image editing through explicit aesthetic planning.',
		ru: 'Чтобы достичь автономного редактирования изображений, мы представляем PhotoAgent — систему, которая продвигает редактирование изображений через явное эстетическое планирование.',
	},
	{
		en: 'Specifically, PhotoAgent formulates autonomous image editing as a long-horizon decision-making problem.',
		ru: 'А именно, PhotoAgent формулирует автономное редактирование изображений как задачу принятия решений на длительном горизонте.',
	},
	{
		en: 'It reasons over user aesthetic intent, plans multi-step editing actions via tree search, and iteratively refines results through closed-loop execution with memory and visual feedback, without requiring step-by-step user prompts.',
		ru: 'Он анализирует эстетическое намерение пользователя, планирует многошаговые действия по редактированию через поиск по дереву и итеративно улучшает результаты через замкнутый цикл с памятью и визуальной обратной связью, не требуя пошаговых подсказок от пользователя.',
	},
	{
		en: 'To support reliable evaluation in real-world scenarios, we introduce UGC-Edit, an aesthetic evaluation benchmark consisting of 7,000 photos and a learned aesthetic reward model.',
		ru: 'Чтобы обеспечить надёжную оценку в реальных сценариях, мы представляем UGC-Edit — бенчмарк эстетической оценки, состоящий из 7000 фотографий и обученной модели эстетического вознаграждения.',
	},
	{
		en: 'We also construct a test set containing 1,017 photos to systematically assess autonomous photo editing performance.',
		ru: 'Мы также создали тестовый набор из 1017 фотографий для систематической оценки производительности автономного редактирования фотографий.',
	},
	{
		en: 'Extensive experiments demonstrate that PhotoAgent consistently improves both instruction adherence and visual quality compared with baseline methods.',
		ru: 'Обширные эксперименты показывают, что PhotoAgent последовательно улучшает как следование инструкциям, так и визуальное качество по сравнению с базовыми методами.',
	},
	{
		en: 'The project page is https://mdayao.github.io/PhotoAgent.',
		ru: 'Страница проекта: https://mdayao.github.io/PhotoAgent.',
	},

	// ---- 1. INTRODUCTION ----
	{
		en: 'Recent instruction-based image editing models (InstructPix2Pix, SDXL, SD, GPT-4o, Flux.1 kontext, Bagel, etc.) enable amateur users to achieve professional photo edits through natural language commands (e.g., remove the passersby), rather than solely manipulating low-level sliders (e.g., brightness and color).',
		ru: 'Современные инструктивно-ориентированные модели редактирования изображений, такие как InstructPix2Pix, SDXL, Stable Diffusion, GPT-4o, Flux.1 kontext, Bagel и другие, позволяют непрофессиональным пользователям достигать профессионального редактирования фотографий с помощью команд на естественном языке (например, «убрать прохожих»), а не только через манипуляции низкоуровневыми ползунками (например, яркостью и цветом).',
	},
	{
		en: "This shift broadens the scope of computational photography, moving beyond fidelity to the captured scene toward fidelity to the user's aesthetic intent, thereby democratizing powerful photographic expression.",
		ru: 'Этот сдвиг расширяет область вычислительной фотографии, перемещая акцент с точности воспроизведения сцены на точность соответствия эстетическому замыслу пользователя, тем самым демократизируя мощные средства фотографического выражения.',
	},
	{
		en: 'Despite these advances, a critical bottleneck remains: these powerful models fundamentally rely on continuous user involvement, as shown in Fig. 1.',
		ru: 'Несмотря на эти достижения, остаётся критическое узкое место: эти мощные модели фундаментально полагаются на постоянное участие пользователя, как показано на рисунке 1.',
	},
	{
		en: "Their effectiveness largely depends on the user's ability to design precise and sequential instructions, which is difficult for amateur users.",
		ru: 'Их эффективность в значительной степени зависит от способности пользователя создавать точные и последовательные инструкции, что сложно для непрофессиональных пользователей.',
	},
	{
		en: 'This reliance introduces several fundamental limitations.',
		ru: 'Эта зависимость порождает несколько фундаментальных ограничений.',
	},
	{
		en: '(1) Expertise barrier: Effective interaction requires expert knowledge.',
		ru: 'Первое: барьер экспертизы. Эффективное взаимодействие требует экспертных знаний.',
	},
	{
		en: 'Amateur users often struggle either with designing articulate and precise editing instructions (e.g., decomposing "make my photo better" into detailed steps) or with evaluating whether editing results meet professional quality standards.',
		ru: 'Непрофессиональные пользователи часто испытывают трудности либо с разработкой чётких и точных инструкций по редактированию (например, разложить запрос «улучшить моё фото» на детальные шаги), либо с оценкой того, соответствуют ли результаты редактирования профессиональным стандартам качества.',
	},
	{
		en: '(2) Algorithm selection: Different editing tasks require different specialized models.',
		ru: 'Второе: выбор алгоритма. Разные задачи редактирования требуют разных специализированных моделей.',
	},
	{
		en: 'A single model may not be sufficient for all tasks, so users need to switch between models to achieve the desired results.',
		ru: 'Единой модели может быть недостаточно для всех задач, поэтому пользователям необходимо переключаться между моделями для достижения желаемых результатов.',
	},
	{
		en: '(3) Interaction complexity: These models often require users, even professional ones, to issue multiple iterative commands, which is inherently time-consuming and prevents full automation for batch processing.',
		ru: 'Третье: сложность взаимодействия. Эти модели часто требуют от пользователей, даже профессионалов, выполнения множества итеративных команд, что отнимает много времени и препятствует полной автоматизации пакетной обработки.',
	},
	{
		en: 'We argue that the next frontier in computational photography is not merely a single powerful editor or processor, but an autonomous editing agent that can enhance photos without requiring expert-level operation.',
		ru: 'Мы утверждаем, что следующий рубеж в вычислительной фотографии — это не просто единый мощный редактор или процессор, а автономный редактирующий агент, который может улучшать фотографии без необходимости экспертного уровня управления.',
	},
	{
		en: "Such an agent would emulate the decision-making process of a human photo editor, who strategically selects and sequences tools based on an assessment of the image's needs, and edits with specific tools.",
		ru: 'Такой агент имитировал бы процесс принятия решений человека-редактора фотографий, который стратегически выбирает и упорядочивает инструменты на основе оценки потребностей изображения и редактирует с помощью конкретных инструментов.',
	},
	{
		en: 'Recently, large vision and multimodal models (LVMs) have demonstrated remarkable perception and instruction-conditioned editing capabilities, making an autonomous editing agent feasible.',
		ru: 'В последнее время большие визуальные и мультимодальные модели продемонстрировали замечательные способности к восприятию и редактированию по инструкции, что делает возможным создание автономного редактирующего агента.',
	},
	{
		en: 'In this paper, we introduce PhotoAgent, a novel autonomous system that integrates large vision and multimodal models (LVMs) with a suite of editing tools into a coherent framework, enabling fully automated, high-quality photo editing.',
		ru: 'В этой статье мы представляем PhotoAgent — новую автономную систему, которая объединяет большие визуальные и мультимодальные модели с набором инструментов редактирования в единую структуру, обеспечивая полностью автоматизированное высококачественное редактирование фотографий.',
	},
	{
		en: 'As illustrated in Fig. 1, PhotoAgent introduces exploratory visual aesthetic planning within a closed-loop framework.',
		ru: 'Как показано на рисунке 1, PhotoAgent внедряет исследовательское визуально-эстетическое планирование в рамках замкнутого цикла.',
	},
	{
		en: 'Unlike open-loop systems (e.g., GenArtist) that execute linear action sequences without feedback, PhotoAgent continuously evaluates its edits and strategically explores the editing space.',
		ru: 'В отличие от систем с разомкнутым циклом (например, GenArtist), которые выполняют линейные последовательности действий без обратной связи, PhotoAgent непрерывно оценивает свои правки и стратегически исследует пространство редактирования.',
	},
	{
		en: 'This helps to avoid both short-sighted decisions and irrecoverable artifacts that commonly happen in greedy approaches, enabling coherent and high-quality results.',
		ru: 'Это помогает избежать как близоруких решений, так и неисправимых артефактов, которые часто возникают при «жадных» подходах, обеспечивая когерентные и высококачественные результаты.',
	},
	{
		en: 'In addition, PhotoAgent enables context editing, moving beyond the low-level adjustments (e.g., color, contrast, illumination) that existing photo-editing agents primarily perform.',
		ru: 'Кроме того, PhotoAgent позволяет осуществлять контекстное редактирование, выходя за рамки низкоуровневых корректировок (цвет, контраст, освещение), которые в основном выполняют существующие агенты по редактированию фотографий.',
	},
	{
		en: 'This is achieved through programmatic control over a rich library of editing actions and flexible editing tools, enabling semantically meaningful manipulations such as adding a sun to a dim sky, making the scene feel more vibrant and lively, or modifying objects in the scene.',
		ru: 'Это достигается с помощью программного управления богатой библиотекой действий по редактированию и гибкими инструментами, что позволяет выполнять семантически значимые манипуляции, такие как добавление солнца в тусклое небо, чтобы сцена казалась более яркой и живой, или изменение объектов на сцене.',
	},

	// ---- PAGE 2: SYSTEM COMPONENTS ----
	{
		en: 'To achieve this, PhotoAgent consists of four core components: a perceiver, a planner, an executor, and an evaluator.',
		ru: 'Чтобы достичь этого, PhotoAgent состоит из четырёх основных компонентов: персептора, планировщика, исполнителя и оценщика.',
	},
	{
		en: 'The process begins with a VLM-based perceiver (e.g., Qwen3-VL) that interprets the input image and produces a set of semantically meaningful editing actions.',
		ru: 'Процесс начинается с персептора на основе VLM (например, Qwen3-VL), который интерпретирует входное изображение и создаёт набор семантически значимых действий по редактированию.',
	},
	{
		en: 'These candidate actions are then passed to a Monte Carlo Tree Search (MCTS)-based planner, which explores possible editing trajectories in a tree structure and selects the top-K most promising actions.',
		ru: 'Эти действия-кандидаты затем передаются планировщику на основе поиска по дереву Монте-Карло (MCTS), который исследует возможные траектории редактирования в виде древовидной структуры и выбирает топ-K наиболее перспективных действий.',
	},
	{
		en: 'This exploratory mechanism ensures that our system embodies exploratory visual aesthetic planning, avoiding myopic decisions.',
		ru: 'Этот исследовательский механизм гарантирует, что наша система воплощает исследовательское визуально-эстетическое планирование, избегая близоруких решений.',
	},
	{
		en: 'The selected actions are subsequently executed using either advanced image generation tools (e.g., Flux.1 Kontext) or traditional image processing libraries (e.g., OpenCV/PIL).',
		ru: 'Выбранные действия затем выполняются либо с использованием передовых инструментов генерации изображений (например, Flux.1 Kontext), либо с помощью традиционных библиотек обработки изображений (например, OpenCV/PIL).',
	},
	{
		en: "Finally, the evaluator integrates feedback from multiple scoring modules, allowing only those actions that positively contribute to the image's aesthetic quality to pass.",
		ru: 'Наконец, оценщик интегрирует обратную связь от нескольких оценочных модулей, позволяя пройти только тем действиям, которые положительно влияют на эстетическое качество изображения.',
	},
	{
		en: 'By iterating through this perceive-plan-execute-evaluate cycle, PhotoAgent forms a fully closed-loop process, enabling autonomous and reliable progress toward the final editing goal.',
		ru: 'Итеративно проходя через этот цикл «восприятие — планирование — исполнение — оценка», PhotoAgent формирует полностью замкнутый процесс, обеспечивая автономное и надёжное продвижение к конечной цели редактирования.',
	},
	{
		en: 'Additionally, one major challenge in this design is that existing image quality evaluation methods are insufficient for user-driven photo editing, also referred to as user-generated content (UGC).',
		ru: 'Кроме того, одна из основных проблем в этой конструкции заключается в том, что существующие методы оценки качества изображений недостаточны для редактирования фотографий, управляемого пользователем, то есть для пользовательского контента (UGC).',
	},
	{
		en: 'The core issue lies in the composition of existing datasets, where existing datasets are overly generic, containing AI-generated images, screenshots, advertisements, and posters, rather than authentic user-captured photographs.',
		ru: 'Основная проблема кроется в составе существующих наборов данных, которые являются слишком общими: они содержат сгенерированные ИИ изображения, скриншоты, рекламу и постеры, а не аутентичные фотографии, сделанные пользователями.',
	},
	{
		en: 'To address this, we introduce UGC-Edit, a dataset of 7,000 real user photos annotated with human aesthetic scores.',
		ru: 'Чтобы решить эту проблему, мы представляем UGC-Edit — набор данных из 7000 реальных пользовательских фотографий, аннотированных человеческими эстетическими оценками.',
	},
	{
		en: 'We also train a reward model on UGC-Edit, enabling reliable evaluation of aesthetic quality for multi-step image editing.',
		ru: 'Мы также обучаем модель вознаграждения на UGC-Edit, что позволяет надёжно оценивать эстетическое качество при многошаговом редактировании изображений.',
	},
	{
		en: 'Finally, to comprehensively evaluate the editing, we construct a test set of real photographs consisting of 1,017 images, on which our system achieves state-of-the-art results across quantitative metrics, qualitative assessment, and user studies.',
		ru: 'Наконец, для всесторонней оценки редактирования мы создаём тестовый набор из реальных фотографий, состоящий из 1017 изображений, на котором наша система достигает самых современных результатов по количественным показателям, качественной оценке и пользовательским исследованиям.',
	},

	// ---- PAGE 3: CONTRIBUTIONS + RELATED WORK ----
	{
		en: 'In summary, this work makes the following contributions.',
		ru: 'Резюмируя, эта работа вносит следующие вклады.',
	},
	{
		en: 'We propose PhotoAgent, an autonomous editing system that integrates a closed-loop architecture with a suite of editing and evaluation tools, enabling robust multi-step editing.',
		ru: 'Мы предлагаем PhotoAgent — автономную систему редактирования, которая объединяет архитектуру замкнутого цикла с набором инструментов редактирования и оценки, обеспечивая надёжное многошаговое редактирование.',
	},
	{
		en: 'We introduce a visual aesthetic planner to explore sequences of editing actions over long horizons, enabling deliberate, goal-driven image editing.',
		ru: 'Мы представляем визуально-эстетический планировщик для исследования последовательностей действий по редактированию на длительных горизонтах, обеспечивая целенаправленное, управляемое целью редактирование изображений.',
	},
	{
		en: 'We present the UGC-Edit dataset and introduce a reward model to support aesthetic research in autonomous image editing.',
		ru: 'Мы представляем набор данных UGC-Edit и внедряем модель вознаграждения для поддержки исследований в области эстетики автономного редактирования изображений.',
	},
	{
		en: 'We also introduce a test set of real photographs for evaluating autonomous photo editing.',
		ru: 'Мы также представляем тестовый набор реальных фотографий для оценки автономного редактирования фотографий.',
	},
	{
		en: 'Extensive experiments demonstrate that our complete system achieves significant improvements in editing quality.',
		ru: 'Обширные эксперименты показывают, что наша полная система достигает значительных улучшений в качестве редактирования.',
	},

	// ---- RELATED WORK: Image Editing ----
	{
		en: 'Image Editing. Early pioneering works primarily leverage Generative Adversarial Networks (GANs) or conditional encoder-decoder architectures for tasks like style transfer and attribute manipulation.',
		ru: 'Редактирование изображений. Ранние новаторские работы в основном использовали генеративно-состязательные сети (GAN) или условные архитектуры кодировщик-декодер для таких задач, как перенос стиля и манипуляция атрибутами.',
	},
	{
		en: 'For example, CycleGAN proposes unpaired image-to-image (I2I) translation, and StarGAN enables multi-attribute manipulation within a single model.',
		ru: 'Например, CycleGAN предлагает непарный перевод изображение-в-изображение, а StarGAN позволяет манипулировать несколькими атрибутами в рамках одной модели.',
	},
	{
		en: 'However, these approaches are inherently limited since their editing capabilities are confined to the narrow distribution of their training data, which often struggle with open-vocabulary requests.',
		ru: 'Однако эти подходы по своей сути ограничены, поскольку их возможности редактирования ограничены узким распределением их тренировочных данных, что часто приводит к трудностям при работе с запросами, выходящими за пределы словаря.',
	},
	{
		en: 'They frequently produce low-resolution or artifact-ridden outputs.',
		ru: 'Они часто дают изображения с низким разрешением или артефактами.',
	},
	{
		en: 'A paradigm shift was ushered in by the advent of powerful diffusion models and their integration with natural language.',
		ru: 'Парадигмальный сдвиг был вызван появлением мощных диффузионных моделей и их интеграцией с естественным языком.',
	},
	{
		en: 'Models like Stable Diffusion treat image editing as conditional image generation, where the input image serves as a foundational condition.',
		ru: 'Такие модели, как Stable Diffusion, рассматривают редактирование изображений как условную генерацию изображений, где входное изображение служит фундаментальным условием.',
	},
	{
		en: 'Recent methods (e.g., Prompt-to-Prompt, InstructPix2Pix) manipulate the features in latent space to enable highly flexible editing following open-vocabulary instructions.',
		ru: 'Недавние методы (например, Prompt-to-Prompt, InstructPix2Pix) манипулируют признаками в скрытом пространстве, чтобы обеспечить высокую гибкость редактирования в соответствии с инструкциями на открытом словаре.',
	},
	{
		en: 'This progress continues with next-generation architectures based on flow matching (e.g., Flux) and the integration of powerful Multimodal Large Language Models (MLLMs) like GPT-4o, Show-o, Bagel, Nano Banana and HunyuanImage-3.0, which aim to tightly couple reasoning and generation.',
		ru: 'Этот прогресс продолжается с архитектурами следующего поколения, основанными на согласовании потоков (например, Flux), и интеграцией мощных мультимодальных больших языковых моделей, таких как GPT-4o, Show-o, Bagel, Nano Banana и HunyuanImage-3.0, которые нацелены на тесную связь рассуждения и генерации.',
	},
	{
		en: 'Despite these remarkable advances, a critical limitation exists.',
		ru: 'Несмотря на эти замечательные достижения, существует критическое ограничение.',
	},
	{
		en: 'These models act primarily as single-step, static executors.',
		ru: 'Эти модели действуют в основном как одношаговые, статические исполнители.',
	},
	{
		en: 'Their performance is highly sensitive to meticulously engineered, low-level prompts, placing the burden of designing instructions and evaluations on the amateur user.',
		ru: 'Их производительность очень чувствительна к тщательно разработанным низкоуровневым подсказкам, что возлагает бремя разработки инструкций и оценки на непрофессионального пользователя.',
	},
	{
		en: 'These limitations prevent the method from handling complex, autonomous multi-step editing tasks, highlighting the need for a higher-level, planning-based framework.',
		ru: 'Эти ограничения препятствуют способности метода справляться со сложными автономными многошаговыми задачами редактирования, подчеркивая необходимость в более высокоуровневой структуре, основанной на планировании.',
	},

	// ---- RELATED WORK: Planning with Autonomous Agents ----
	{
		en: 'Planning with Autonomous Agents. To overcome the above limitations, a promising direction is to design an autonomous agent framework capable of multi-step planning and execution.',
		ru: 'Планирование с автономными агентами. Чтобы преодолеть вышеуказанные ограничения, многообещающим направлением является разработка структуры автономного агента, способного к многошаговому планированию и выполнению.',
	},
	{
		en: 'Early works such as AlphaGo employ planning algorithms like Monte Carlo Tree Search (MCTS) to navigate state spaces.',
		ru: 'Ранние работы, такие как AlphaGo, используют алгоритмы планирования, например поиск по дереву Монте-Карло (MCTS), для навигации в пространствах состояний.',
	},
	{
		en: "Recently, LLM-based agents leverage LLM's reasoning capability to decompose tasks into sequences of actions (e.g., HuggingGPT, ReAct, and Voyager).",
		ru: 'Недавно агенты на основе LLM использовали способность LLM к рассуждению для декомпозиции задач на последовательности действий (например, HuggingGPT, ReAct и Voyager).',
	},
	{
		en: 'Within computer vision, works have explored integrating planning into image editing tasks.',
		ru: 'В области компьютерного зрения работы исследовали интеграцию планирования в задачи редактирования изображений.',
	},
	{
		en: 'Some approaches, such as JarvisArt, MonetGPT, and PhotoArtAgent leverage an LLM as a planner to parse a complex instruction into a sequence of calls to specialized image processing software.',
		ru: 'Некоторые подходы, такие как JarvisArt, MonetGPT и PhotoArtAgent, используют LLM в качестве планировщика для анализа сложной инструкции в последовательность вызовов специализированного программного обеспечения для обработки изображений.',
	},
	{
		en: 'However, existing methods mainly focus on low-level editing tasks, such as color, tone, or exposure adjustments using procedural software tools like Lightroom or GIMP, which are limited to pure retouching.',
		ru: 'Однако существующие методы в основном фокусируются на низкоуровневых задачах редактирования, таких как настройка цвета, тона или экспозиции, с использованием процедурных программных инструментов вроде Lightroom или GIMP, которые ограничены чистой ретушью.',
	},
	{
		en: 'More recent researches begin to explore directly applying MCTS and other search strategies to the text-to-image (T2I) generation process itself, building a search tree in the latent or textual space to find sequences of actions that better satisfy a high-level goal.',
		ru: 'Более поздние исследования начинают исследовать прямое применение MCTS и других стратегий поиска к самому процессу генерации текст-в-изображение, строя дерево поиска в скрытом или текстовом пространстве для нахождения последовательностей действий, которые лучше удовлетворяют высокоуровневой цели.',
	},
	{
		en: 'However, existing methods have no planning capability for instruction-based image editing.',
		ru: 'Однако существующие методы не обладают возможностями планирования для инструктивно-ориентированного редактирования изображений.',
	},
	{
		en: 'Our approach addresses this through an MCTS planner that considers internal simulation with external execution.',
		ru: 'Наш подход решает эту проблему с помощью планировщика MCTS, который учитывает внутреннюю симуляцию с внешним выполнением.',
	},
	{
		en: 'We also employ a learned reward model trained on user preferences to guide the search.',
		ru: 'Мы также используем обученную модель вознаграждения, обученную на пользовательских предпочтениях, для направления поиска.',
	},
	{
		en: 'This combination enables robust planning with a diverse toolset and is supported by a new editing-specific benchmark for evaluation.',
		ru: 'Эта комбинация обеспечивает надёжное планирование с разнообразным набором инструментов и поддерживается новым специализированным для редактирования бенчмарком для оценки.',
	},

	// ---- RELATED WORK: Image Evaluation ----
	{
		en: "Image Evaluation. In an automated image editing pipeline, the evaluator is important, as it defines the reward function that guides the agent's actions and determines the final output.",
		ru: 'Оценка изображений. В автоматизированном конвейере редактирования изображений оценщик очень важен, поскольку он задаёт функцию вознаграждения, которая направляет действия агента и определяет конечный результат.',
	},
	{
		en: 'Traditional full-reference image quality metrics, such as Peak Signal-to-Noise Ratio (PSNR) and Structural Similarity Index (SSIM), are not suited for this open-world setting.',
		ru: 'Традиционные метрики качества изображений с полным эталоном, такие как пиковое отношение сигнал/шум (PSNR) и индекс структурного сходства (SSIM), не подходят для этой открытой среды.',
	},
	{
		en: 'They require a ground-truth target image, which is obviously impossible for creative editing tasks.',
		ru: 'Они требуют эталонного целевого изображения, что, очевидно, невозможно для творческих задач редактирования.',
	},
	{
		en: 'The community then turns to no-reference metrics, including distribution-based measures like Fréchet Inception Distance (FID), aesthetic predictors, or CLIP-based image-text alignment scores.',
		ru: 'Затем сообщество обратилось к метрикам без эталона, включая метрики, основанные на распределении, такие как расстояние Фреше по начальным активациям (FID), эстетические предикторы или метрики выравнивания изображение-текст на основе CLIP.',
	},
	{
		en: 'While a step forward, these metrics are often too broad to provide reliable, fine-grained signals for specific editing tasks on user-generated content (UGC).',
		ru: 'Хотя это и шаг вперёд, эти метрики часто слишком широки, чтобы обеспечить надёжные детализированные сигналы для конкретных задач редактирования пользовательского контента (UGC).',
	},
	{
		en: 'They cannot capture the subtle quality differences that are crucial in specific image editing tasks, such as aesthetic-oriented editing.',
		ru: 'Они не могут уловить тонкие различия в качестве, которые имеют решающее значение в конкретных задачах редактирования изображений, таких как эстетически-ориентированное редактирование.',
	},
	{
		en: 'To address this limitation, we introduce a specialized UGC evaluation dataset and train a reward model on the dataset.',
		ru: 'Чтобы решить эту проблему, мы представляем специализированный набор данных для оценки UGC и обучаем модель вознаграждения на этом наборе данных.',
	},
	{
		en: 'The reward model is adopted from a pretrained vision-language model (VLM) that contains inherent knowledge.',
		ru: 'Модель вознаграждения заимствована из предварительно обученной визуально-языковой модели, которая содержит присущие ей знания.',
	},
]
