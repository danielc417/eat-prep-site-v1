const chapters = [
  {
    id: 6,
    title: "The Human Body",
    description: "Anatomy, body systems, planes, positions, and basic physiology."
  },
  {
    id: 8,
    title: "Lifting and Moving Patients",
    description: "Body mechanics, patient movement, emergency moves, and equipment."
  },
  {
    id: 9,
    title: "Patient Assessment",
    description: "Scene size-up, primary assessment, history, secondary assessment, and reassessment."
  },
  {
    id: 10,
    title: "Airway Management",
    description: "Airway opening, suctioning, oxygen, ventilation, and airway adjuncts."
  }
];

const questionBank = [
  {
  chapter: 6,
  topic: "The Human Body",
  question: "What body system is mainly responsible for breathing?",
  answers: [
    "Digestive system",
    "Respiratory system",
    "Skeletal system",
    "Endocrine system"
  ],
  correct: 1,
  explanation: "The respiratory system moves oxygen into the body and removes carbon dioxide."
},
{
  chapter: 6,
  topic: "The Human Body",
  question: "What does the cardiovascular system mainly move through the body?",
  answers: [
    "Blood",
    "Air",
    "Food",
    "Urine"
  ],
  correct: 0,
  explanation: "The cardiovascular system circulates blood through the heart and blood vessels."
},
{
  chapter: 6,
  topic: "Anatomy",
  question: "What is the anatomical position?",
  answers: [
    "Lying face down",
    "Standing upright, facing forward, arms at sides, palms forward",
    "Sitting with legs crossed",
    "Lying on the left side"
  ],
  correct: 1,
  explanation: "Anatomical position is the standard reference position used to describe body locations."
},
{
  chapter: 6,
  topic: "Anatomy",
  question: "What does anterior mean?",
  answers: [
    "Toward the back",
    "Toward the front",
    "Away from the midline",
    "Below the waist"
  ],
  correct: 1,
  explanation: "Anterior means toward the front of the body."
},
{
  chapter: 6,
  topic: "Anatomy",
  question: "What does posterior mean?",
  answers: [
    "Toward the front",
    "Toward the back",
    "Above the head",
    "Toward the feet"
  ],
  correct: 1,
  explanation: "Posterior means toward the back of the body."
},
{
  chapter: 6,
  topic: "Anatomy",
  question: "What does medial mean?",
  answers: [
    "Toward the midline of the body",
    "Away from the midline",
    "Toward the head",
    "Toward the feet"
  ],
  correct: 0,
  explanation: "Medial means closer to the midline of the body."
},
{
  chapter: 6,
  topic: "Anatomy",
  question: "What does lateral mean?",
  answers: [
    "Toward the midline",
    "Away from the midline",
    "Toward the back",
    "Toward the head"
  ],
  correct: 1,
  explanation: "Lateral means farther away from the midline of the body."
},
{
  chapter: 6,
  topic: "Body Systems",
  question: "Which organ is the main pump of the cardiovascular system?",
  answers: [
    "Brain",
    "Liver",
    "Heart",
    "Stomach"
  ],
  correct: 2,
  explanation: "The heart pumps blood through the body."
},
{
  chapter: 6,
  topic: "Body Systems",
  question: "What is the main job of red blood cells?",
  answers: [
    "Fight infection",
    "Carry oxygen",
    "Digest food",
    "Make hormones"
  ],
  correct: 1,
  explanation: "Red blood cells carry oxygen to the body's tissues."
},
{
  chapter: 6,
  topic: "Body Systems",
  question: "Which body system controls thought, movement, and sensation?",
  answers: [
    "Nervous system",
    "Digestive system",
    "Urinary system",
    "Integumentary system"
  ],
  correct: 0,
  explanation: "The nervous system includes the brain, spinal cord, and nerves. It controls body functions and responses."
},
{
  chapter: 6,
  topic: "Anatomy and Physiology",
  question: "Which term means the structure of the body and where body parts are located?",
  answers: [
    "Anatomy",
    "Physiology",
    "Pathophysiology",
    "Perfusion"
  ],
  correct: 0,
  explanation: "Anatomy is body structure. EMTs use anatomy to describe locations and injuries accurately."
},
{
  chapter: 6,
  topic: "Anatomy and Physiology",
  question: "Which term means how disease or injury changes normal body function?",
  answers: [
    "Anatomy",
    "Physiology",
    "Pathophysiology",
    "Topography"
  ],
  correct: 2,
  explanation: "Pathophysiology explains how illness or injury disrupts normal physiology."
},
{
  chapter: 6,
  topic: "Body Planes",
  question: "Right and left in anatomy are always based on whose right and left?",
  answers: [
    "The EMT's",
    "The patient's",
    "The driver’s",
    "The receiving nurse’s"
  ],
  correct: 1,
  explanation: "Anatomic directions are always from the patient’s perspective."
},
{
  chapter: 6,
  topic: "Body Planes",
  question: "Which plane divides the body into front and back portions?",
  answers: [
    "Sagittal plane",
    "Frontal or coronal plane",
    "Transverse plane",
    "Midsagittal plane"
  ],
  correct: 1,
  explanation: "The frontal, or coronal, plane divides the body into anterior and posterior portions."
},
{
  chapter: 6,
  topic: "Skeletal System",
  question: "Which items are part of the axial skeleton? Select all that apply.",
  answers: [
    "Skull",
    "Spine",
    "Ribs and sternum",
    "Arms and legs"
  ],
  correct: [0, 1, 2],
  explanation: "The axial skeleton includes the skull, spinal column, ribs, and sternum. Arms and legs are appendicular skeleton."
},
{
  chapter: 6,
  topic: "Musculoskeletal System",
  question: "Which pairing is correct?",
  answers: [
    "Ligaments connect muscle to bone; tendons connect bone to bone",
    "Ligaments connect bone to bone; tendons connect muscle to bone",
    "Cartilage connects muscle to skin",
    "Skeletal muscle is involuntary"
  ],
  correct: 1,
  explanation: "Ligaments connect bone to bone. Tendons connect muscle to bone. Skeletal muscle is voluntary."
},
{
  chapter: 6,
  topic: "Spine",
  question: "Which spine section has 7 vertebrae and is located in the neck?",
  answers: [
    "Cervical",
    "Thoracic",
    "Lumbar",
    "Sacral"
  ],
  correct: 0,
  explanation: "The cervical spine has 7 vertebrae and is located in the neck."
},
{
  chapter: 6,
  topic: "Spine",
  question: "A suspected injury to the head, neck, or spine is concerning because it can affect which functions? Select all that apply.",
  answers: [
    "Breathing",
    "Movement",
    "Sensation",
    "Hair color"
  ],
  correct: [0, 1, 2],
  explanation: "Spinal or nervous system injury can affect breathing, movement, and sensation."
},
{
  chapter: 6,
  topic: "Respiratory System",
  question: "Which airway route is in the correct order?",
  answers: [
    "Alveoli, bronchioles, trachea, mouth",
    "Nose or mouth, pharynx, larynx, trachea, bronchi, bronchioles, alveoli",
    "Trachea, larynx, pharynx, bronchi, alveoli",
    "Mouth, aorta, bronchi, capillaries, alveoli"
  ],
  correct: 1,
  explanation: "Air flows from the nose or mouth through the pharynx, larynx, trachea, bronchi, bronchioles, and finally the alveoli."
},
{
  chapter: 6,
  topic: "Respiratory System",
  question: "Where does oxygen and carbon dioxide exchange occur?",
  answers: [
    "Alveoli",
    "Larynx",
    "Trachea",
    "Diaphragm"
  ],
  correct: 0,
  explanation: "The alveoli are tiny air sacs where gas exchange occurs."
},
{
  chapter: 6,
  topic: "Respiratory System",
  question: "Which findings can suggest inadequate breathing? Select all that apply.",
  answers: [
    "Unable to speak in full sentences",
    "Accessory muscle use",
    "Cyanosis",
    "Quiet, regular breathing with normal skin color"
  ],
  correct: [0, 1, 2],
  explanation: "Trouble speaking, accessory muscle use, and cyanosis can indicate inadequate breathing. Quiet, regular breathing with normal color is reassuring."
},
{
  chapter: 6,
  topic: "Respiratory System",
  question: "What are agonal gasps?",
  answers: [
    "Normal deep breaths during sleep",
    "Occasional gasping breaths that are not adequate breathing",
    "Fast but effective breathing",
    "A normal pediatric breathing pattern"
  ],
  correct: 1,
  explanation: "Agonal gasps can occur in cardiac arrest and should not be treated as adequate breathing."
},
{
  chapter: 6,
  topic: "Circulatory System",
  question: "What does perfusion mean?",
  answers: [
    "The movement of air into the lungs",
    "Adequate blood flow delivering oxygen and nutrients to tissues",
    "The relaxation phase of the heart",
    "The process of food digestion"
  ],
  correct: 1,
  explanation: "Perfusion means tissues are receiving enough blood, oxygen, and nutrients."
},
{
  chapter: 6,
  topic: "Circulatory System",
  question: "Which statement correctly describes pulmonary circulation?",
  answers: [
    "It carries oxygen-rich blood from the left heart to the body",
    "It carries oxygen-poor blood from the right heart to the lungs and oxygen-rich blood back to the left heart",
    "It only supplies the heart muscle",
    "It carries blood from capillaries directly to the brain"
  ],
  correct: 1,
  explanation: "Pulmonary circulation moves blood between the right side of the heart and the lungs, then back to the left side of the heart."
},
{
  chapter: 6,
  topic: "Heart",
  question: "Which chamber pumps oxygen-rich blood to the body?",
  answers: [
    "Right atrium",
    "Right ventricle",
    "Left atrium",
    "Left ventricle"
  ],
  correct: 3,
  explanation: "The left ventricle is the strongest chamber and pumps oxygen-rich blood through the aorta to the body."
},
{
  chapter: 6,
  topic: "Heart",
  question: "What is cardiac output?",
  answers: [
    "Heart rate multiplied by stroke volume",
    "Blood pressure divided by pulse",
    "Respiratory rate multiplied by oxygen saturation",
    "The amount of air moved with one breath"
  ],
  correct: 0,
  explanation: "Cardiac output is the amount of blood pumped in one minute: heart rate times stroke volume."
},
{
  chapter: 6,
  topic: "Blood Flow",
  question: "Which route best summarizes blood flow through the body?",
  answers: [
    "Body, right heart, lungs, left heart, body",
    "Body, left heart, lungs, right heart, body",
    "Lungs, right heart, body, left heart, lungs",
    "Aorta, lungs, vena cava, body"
  ],
  correct: 0,
  explanation: "A simple way to remember circulation is body to right heart to lungs to left heart to body."
},
{
  chapter: 6,
  topic: "Blood Flow",
  question: "Which pulmonary vessel test trap is correct?",
  answers: [
    "Pulmonary arteries carry oxygen-rich blood to the heart",
    "Pulmonary veins carry oxygen-poor blood away from the heart",
    "Pulmonary arteries carry oxygen-poor blood away from the heart to the lungs",
    "Pulmonary veins and arteries both carry oxygen-rich blood"
  ],
  correct: 2,
  explanation: "Pulmonary arteries carry oxygen-poor blood away from the heart to the lungs. Pulmonary veins carry oxygen-rich blood back to the heart."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 1?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Capillaries of the right lung",
    "Superior vena cava",
    "Pulmonary vein",
    "Left ventricle"
  ],
  correct: 0,
  explanation: "Label 1 points to the capillaries of the right lung, where gas exchange occurs."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 2?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Inferior vena cava",
    "Superior vena cava",
    "Aorta",
    "Pulmonary artery"
  ],
  correct: 1,
  explanation: "Label 2 points to the superior vena cava, which returns oxygen-poor blood from the upper body to the heart."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 3?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Capillaries of the upper body",
    "Capillaries of the left lung",
    "Pulmonary vein",
    "Right atrium"
  ],
  correct: 0,
  explanation: "Label 3 points to the capillaries of the upper body, where oxygen is delivered to tissues and carbon dioxide is picked up."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 4?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Pulmonary artery",
    "Inferior vena cava",
    "Oxygenated blood/systemic artery going to the upper body",
    "Right ventricle"
  ],
  correct: 2,
  explanation: "Label 4 points to oxygenated blood in a systemic artery going to the upper body."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 5?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Aorta",
    "Pulmonary vein",
    "Right atrium",
    "Inferior vena cava"
  ],
  correct: 0,
  explanation: "Label 5 points to the aorta, the major artery carrying oxygenated blood from the left ventricle to the body."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 6?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Pulmonary vein",
    "Pulmonary artery",
    "Aorta",
    "Left atrium"
  ],
  correct: 1,
  explanation: "Label 6 points to the pulmonary artery, which carries oxygen-poor blood from the heart to the lungs."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 7?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Capillaries of the right lung",
    "Left ventricle",
    "Capillaries of the left lung",
    "Superior vena cava"
  ],
  correct: 2,
  explanation: "Label 7 points to the capillaries of the left lung, where blood releases carbon dioxide and picks up oxygen."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 8?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Pulmonary artery",
    "Aorta",
    "Right ventricle",
    "Pulmonary vein"
  ],
  correct: 3,
  explanation: "Label 8 points to the pulmonary vein, which carries oxygenated blood from the lungs back to the heart."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 9?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Left atrium",
    "Left ventricle",
    "Right atrium",
    "Inferior vena cava"
  ],
  correct: 0,
  explanation: "Label 9 next to the heart points to the left atrium, which receives oxygenated blood from the pulmonary veins."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 10?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Right ventricle",
    "Left atrium",
    "Left ventricle",
    "Pulmonary artery"
  ],
  correct: 2,
  explanation: "Label 10 points to the left ventricle, which pumps oxygenated blood into the aorta."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 11?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Superior vena cava",
    "Inferior vena cava",
    "Aorta",
    "Pulmonary vein"
  ],
  correct: 1,
  explanation: "Label 11 points to the inferior vena cava, which returns oxygen-poor blood from the lower body to the heart."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 12?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Right atrium",
    "Left atrium",
    "Right ventricle",
    "Aorta"
  ],
  correct: 0,
  explanation: "Label 12 points to the right atrium, which receives oxygen-poor blood from the vena cava."
},
{
  chapter: 6,
  topic: "Heart Diagram",
  question: "In the diagram, what is label 13?",
  image: "assets/heart-flow.png",
  imageAlt: "Numbered diagram of blood flow through the heart, lungs, and body.",
  answers: [
    "Left ventricle",
    "Pulmonary vein",
    "Right atrium",
    "Right ventricle"
  ],
  correct: 3,
  explanation: "Label 13 points to the right ventricle, which pumps oxygen-poor blood toward the lungs."
},{
  chapter: 6,
  topic: "Blood Vessels",
  question: "Which statements about arteries are correct? Select all that apply.",
  answers: [
    "They carry blood away from the heart",
    "They are usually high-pressure vessels",
    "A severed artery may bleed in spurts",
    "They always carry oxygen-poor blood"
  ],
  correct: [0, 1, 2],
  explanation: "Arteries carry blood away from the heart, are usually high-pressure, and arterial bleeding may spurt. Most arteries carry oxygen-rich blood, except pulmonary arteries."
},
{
  chapter: 6,
  topic: "Blood Vessels",
  question: "Where do oxygen, nutrients, carbon dioxide, and wastes exchange between blood and cells?",
  answers: [
    "Capillaries",
    "Veins",
    "Aorta",
    "Vena cava"
  ],
  correct: 0,
  explanation: "Capillaries are the tiny vessels where exchange occurs."
},
{
  chapter: 6,
  topic: "Blood",
  question: "Which blood components help with clotting? Select all that apply.",
  answers: [
    "Platelets",
    "Clotting factors",
    "Hemoglobin",
    "Leukocytes"
  ],
  correct: [0, 1],
  explanation: "Platelets and clotting factors help form clots. Hemoglobin carries oxygen, and leukocytes fight infection."
},
{
  chapter: 6,
  topic: "Blood",
  question: "Why is a spleen injury dangerous?",
  answers: [
    "The spleen contains air sacs",
    "The spleen is highly vascular and can bleed severely",
    "The spleen controls all breathing",
    "The spleen pumps blood to the body"
  ],
  correct: 1,
  explanation: "The spleen stores and filters blood and can bleed heavily when injured."
},
{
  chapter: 6,
  topic: "Blood Pressure and Shock",
  question: "What does systole mean?",
  answers: [
    "The ventricle relaxes and fills",
    "The left ventricle contracts and pumps blood out",
    "Blood returns from the lungs",
    "Capillaries exchange oxygen"
  ],
  correct: 1,
  explanation: "Systole is the contraction phase. The systolic pressure is the top blood pressure number."
},
{
  chapter: 6,
  topic: "Blood Pressure and Shock",
  question: "When blood loss occurs, how does the body try to compensate? Select all that apply.",
  answers: [
    "Increases heart rate",
    "Constricts blood vessels",
    "Redirects blood toward the brain, heart, and lungs",
    "Stops perfusion to all organs equally"
  ],
  correct: [0, 1, 2],
  explanation: "The body compensates by raising heart rate, constricting vessels, and protecting priority organs."
},
{
  chapter: 6,
  topic: "Blood Pressure and Shock",
  question: "What is shock?",
  answers: [
    "Widespread inadequate perfusion",
    "Normal blood flow to tissues",
    "A fast respiratory rate only",
    "A normal response to exercise"
  ],
  correct: 0,
  explanation: "Shock is widespread hypoperfusion, meaning tissues are not getting enough blood and oxygen."
},
{
  chapter: 6,
  topic: "Nervous System",
  question: "Which structures make up the central nervous system?",
  answers: [
    "Brain and spinal cord",
    "Arms and legs",
    "Heart and blood vessels",
    "Skin and sweat glands"
  ],
  correct: 0,
  explanation: "The central nervous system includes the brain and spinal cord."
},
{
  chapter: 6,
  topic: "Nervous System",
  question: "Which brain part controls breathing, heart rate, blood pressure, and consciousness?",
  answers: [
    "Cerebrum",
    "Cerebellum",
    "Brain stem",
    "Pancreas"
  ],
  correct: 2,
  explanation: "The brain stem controls vital functions such as breathing, heart rate, blood pressure, and consciousness."
},
{
  chapter: 6,
  topic: "Skin",
  question: "Which skin findings can indicate life threats or poor perfusion? Select all that apply.",
  answers: [
    "Pale skin",
    "Cool, clammy skin",
    "Blue or cyanotic skin",
    "Warm, dry, normal-colored skin after resting"
  ],
  correct: [0, 1, 2],
  explanation: "Pale, cool and clammy, or cyanotic skin can suggest poor perfusion, shock, or low oxygen."
},
{
  chapter: 6,
  topic: "Body Systems",
  question: "Which organs are part of the urinary system? Select all that apply.",
  answers: [
    "Kidneys",
    "Ureters",
    "Bladder",
    "Alveoli"
  ],
  correct: [0, 1, 2],
  explanation: "The urinary system includes kidneys, ureters, bladder, and urethra. Alveoli belong to the respiratory system."
},
{
  chapter: 6,
  topic: "Endocrine and Lymphatic Systems",
  question: "Which statements are correct? Select all that apply.",
  answers: [
    "The pancreas helps regulate blood glucose",
    "The adrenal glands release epinephrine and norepinephrine during stress",
    "The lymphatic system supports immunity and fluid balance",
    "The gallbladder is the main organ of breathing"
  ],
  correct: [0, 1, 2],
  explanation: "The pancreas, adrenal glands, and lymphatic system all have important regulatory or immune roles. The gallbladder is part of digestion."
},
  {
  chapter: 8,
  topic: "Lifting and Moving",
  question: "What is the safest way to lift a patient?",
  answers: [
    "Bend at the waist and pull fast",
    "Use your legs and keep your back straight",
    "Twist while lifting",
    "Lift alone whenever possible"
  ],
  correct: 1,
  explanation: "Good body mechanics means using your legs, keeping your back straight, and avoiding twisting."
},
{
  chapter: 8,
  topic: "Lifting and Moving",
  question: "When should an emergency move be used?",
  answers: [
    "Whenever the patient is heavy",
    "When there is immediate danger to the patient or rescuers",
    "Only at the hospital",
    "For every stable patient"
  ],
  correct: 1,
  explanation: "Emergency moves are used when there is an immediate threat, like fire, traffic, violence, or unsafe scene conditions."
},
{
  chapter: 8,
  topic: "Body Mechanics",
  question: "Why should you avoid twisting while lifting?",
  answers: [
    "It can increase the risk of back injury",
    "It makes the patient lighter",
    "It improves balance",
    "It is required for all lifts"
  ],
  correct: 0,
  explanation: "Twisting while lifting places stress on your back and can increase injury risk."
},
{
  chapter: 8,
  topic: "Body Mechanics",
  question: "Where should you keep the weight when lifting a patient?",
  answers: [
    "As far from your body as possible",
    "Close to your body",
    "Above your head",
    "Behind your back"
  ],
  correct: 1,
  explanation: "Keeping the weight close to your body gives you better control and reduces strain."
},
{
  chapter: 8,
  topic: "Patient Movement",
  question: "What should EMTs do before lifting a patient with a partner?",
  answers: [
    "Lift without talking",
    "Plan the move and communicate clearly",
    "Let the patient decide all commands",
    "Use only one hand"
  ],
  correct: 1,
  explanation: "Planning and clear communication help prevent injuries and mistakes during patient movement."
},
{
  chapter: 8,
  topic: "Patient Movement",
  question: "Which command is often used so all rescuers lift at the same time?",
  answers: [
    "Maybe now",
    "On my count",
    "Whenever you want",
    "After the ambulance starts"
  ],
  correct: 1,
  explanation: "A clear command like 'on my count' helps everyone move together safely."
},
{
  chapter: 8,
  topic: "Equipment",
  question: "What is a wheeled stretcher mainly used for?",
  answers: [
    "Carrying equipment only",
    "Moving and transporting patients",
    "Measuring oxygen levels",
    "Checking blood pressure"
  ],
  correct: 1,
  explanation: "A wheeled stretcher is commonly used to move and transport patients to and from the ambulance."
},
{
  chapter: 8,
  topic: "Equipment",
  question: "When would a stair chair be especially useful?",
  answers: [
    "Moving a patient up or down stairs",
    "Taking a blood glucose reading",
    "Opening an airway",
    "Starting CPR"
  ],
  correct: 0,
  explanation: "A stair chair helps move a patient safely on stairs when appropriate."
},
{
  chapter: 8,
  topic: "Safety",
  question: "What should you do if a patient is too heavy or the move seems unsafe?",
  answers: [
    "Try anyway",
    "Request additional help or equipment",
    "Drag the patient no matter what",
    "Cancel the call"
  ],
  correct: 1,
  explanation: "If the move is unsafe, request more help or proper equipment to protect the patient and rescuers."
},
{
  chapter: 8,
  topic: "Patient Movement",
  question: "What is the goal when moving a patient?",
  answers: [
    "Move as fast as possible no matter what",
    "Move safely while preventing further injury",
    "Avoid talking to the patient",
    "Use the least people possible"
  ],
  correct: 1,
  explanation: "Patient movement should protect both the patient and the rescuers from injury."
},
 {
  chapter: 9,
  topic: "Patient Assessment Acronyms",
  question: "In patient assessment, what does ABCDE help you remember during the primary assessment?",
  answers: [
    "Airway, breathing, circulation, disability, exposure",
    "Allergies, blood pressure, chief complaint, drugs, events",
    "Age, body, circulation, decision, evaluation",
    "Airway, bleeding, CPR, diagnosis, emergency"
  ],
  correct: 0,
  explanation: "ABCDE is used during the primary assessment. A = Airway, B = Breathing, C = Circulation, D = Disability/mental status, and E = Exposure."
},
{
  chapter: 9,
  topic: "Patient Assessment Acronyms",
  question: "What does SAMPLE help you gather?",
  answers: [
    "A patient history",
    "Only vital signs",
    "Only trauma findings",
    "Only airway problems"
  ],
  correct: 0,
  explanation: "SAMPLE is used during history taking. S = Signs/Symptoms, A = Allergies, M = Medications, P = Past medical history, L = Last oral intake, E = Events leading to the problem."
},
{
  chapter: 9,
  topic: "Patient Assessment Acronyms",
  question: "What does OPQRST help assess?",
  answers: [
    "Pain or a chief complaint",
    "Scene safety",
    "PPE choice",
    "Patient movement"
  ],
  correct: 0,
  explanation: "OPQRST is used during history taking for pain or symptoms. O = Onset, P = Provocation/Palliation, Q = Quality, R = Radiation, S = Severity, T = Time."
},
{
  chapter: 9,
  topic: "Trauma Assessment",
  question: "What does DCAP-BTLS help you look for?",
  answers: [
    "Signs of injury during a trauma assessment",
    "Medication names",
    "Respiratory history",
    "Legal consent"
  ],
  correct: 0,
  explanation: "DCAP-BTLS is used during trauma assessment/secondary assessment. D = Deformities, C = Contusions, A = Abrasions, P = Punctures/Penetrations, B = Burns, T = Tenderness, L = Lacerations, S = Swelling."
},
{
  chapter: 9,
  topic: "Respiratory Assessment",
  question: "What is PASTE commonly used for?",
  answers: [
    "Respiratory history questions",
    "Spinal motion restriction",
    "Scene safety",
    "Checking circulation"
  ],
  correct: 0,
  explanation: "PASTE is often used during respiratory history taking. P = Progression/Provocation, A = Associated chest pain, S = Sputum, T = Talking/Tiredness, E = Exercise tolerance."
},
{
  chapter: 9,
  topic: "Safety",
  question: "When should PPE and BSI be considered?",
  answers: [
    "Before patient contact during scene size-up",
    "Only after transport",
    "Only during documentation",
    "Only if the patient asks"
  ],
  correct: 0,
  explanation: "PPE and BSI are part of scene size-up and provider safety. PPE = Personal Protective Equipment. BSI = Body Substance Isolation."
},
{
  chapter: 9,
  topic: "Toxicology Clues",
  question: "What does SLUDGE help you remember?",
  answers: [
    "Cholinergic/organophosphate poisoning signs",
    "Pain assessment questions",
    "Airway equipment",
    "Vital sign order"
  ],
  correct: 0,
  explanation: "SLUDGE can help recognize cholinergic toxidrome during assessment. S = Salivation, L = Lacrimation, U = Urination, D = Defecation, G = Gastrointestinal upset, E = Emesis."
},
{
  chapter: 9,
  topic: "Altered Mental Status",
  question: "What is AEIOU-TIPS used for?",
  answers: [
    "Possible causes of altered mental status",
    "Scene size-up only",
    "Trauma bleeding control",
    "Lifting patients"
  ],
  correct: 0,
  explanation: "AEIOU-TIPS is used when assessing altered mental status. A = Alcohol/Acidosis, E = Epilepsy/Electrolytes, I = Insulin, O = Overdose/Oxygen, U = Uremia, T = Trauma/Temperature, I = Infection, P = Psychiatric/Poisoning, S = Stroke/Shock."
},
{
  chapter: 9,
  topic: "Scene Size-Up",
  question: "Where would ENAMES fit in patient assessment?",
  answers: [
    "Scene size-up",
    "Secondary assessment only",
    "Reassessment only",
    "After documentation"
  ],
  correct: 0,
  explanation: "ENAMES is used as a scene size-up memory tool in some EMT classes. It helps you think about Environment, Number of patients, Additional resources, Mechanism of injury/Nature of illness, Extrication needs, and Spinal precautions/Safety."
},
{
  chapter: 9,
  topic: "Patient Assessment Flow",
  question: "Which order best matches the general patient assessment flow?",
  answers: [
    "Scene size-up, primary assessment, history, secondary assessment, reassessment",
    "Documentation, transport, scene size-up, airway",
    "Secondary assessment, scene size-up, primary assessment",
    "SAMPLE, OPQRST, then scene safety"
  ],
  correct: 0,
  explanation: "The general flow is scene size-up first, then primary assessment, history taking, secondary assessment, and reassessment."
},

{
  chapter: 9,
  topic: "Patient Assessment",
  question: "What is the first step in patient assessment?",
  answers: [
    "Secondary assessment",
    "Scene size-up",
    "Taking blood pressure",
    "Writing the report"
  ],
  correct: 1,
  explanation: "Patient assessment starts with scene size-up, including safety, number of patients, and need for more resources."
},
{
  chapter: 9,
  topic: "Primary Assessment",
  question: "In the primary assessment, what does A stand for?",
  answers: [
    "Allergies",
    "Airway",
    "Alertness",
    "Assessment"
  ],
  correct: 1,
  explanation: "A stands for airway. You check if the airway is open and clear."
},
{
  chapter: 9,
  topic: "Scene Size-Up",
  question: "Which item is part of scene size-up?",
  answers: [
    "Checking scene safety",
    "Getting a full medication list",
    "Completing the PCR",
    "Taking three sets of vitals"
  ],
  correct: 0,
  explanation: "Scene size-up includes checking safety, mechanism of injury or nature of illness, number of patients, and needed resources."
},
{
  chapter: 9,
  topic: "Primary Assessment",
  question: "What is the main goal of the primary assessment?",
  answers: [
    "Find and treat life threats",
    "Get a full family history",
    "Complete billing information",
    "Choose the hospital cafeteria"
  ],
  correct: 0,
  explanation: "The primary assessment is focused on identifying and treating immediate life threats."
},
{
  chapter: 9,
  topic: "Breathing",
  question: "Which finding may suggest breathing difficulty?",
  answers: [
    "Speaking full sentences easily",
    "Normal skin color",
    "Use of accessory muscles",
    "Calm, relaxed breathing"
  ],
  correct: 2,
  explanation: "Accessory muscle use can suggest increased work of breathing."
},
{
  chapter: 9,
  topic: "Circulation",
  question: "What should you check when assessing circulation?",
  answers: [
    "Pulse, major bleeding, and skin condition",
    "Only the patient’s shoes",
    "Only blood pressure",
    "Only the patient’s name"
  ],
  correct: 0,
  explanation: "Circulation includes pulse, major bleeding, and skin signs such as color, temperature, and moisture."
},
{
  chapter: 9,
  topic: "History Taking",
  question: "What does SAMPLE help you remember?",
  answers: [
    "Patient history questions",
    "How to lift a stretcher",
    "Oxygen tank sizes",
    "Radio channels"
  ],
  correct: 0,
  explanation: "SAMPLE is used for patient history: signs/symptoms, allergies, medications, past history, last oral intake, and events."
},
{
  chapter: 9,
  topic: "History Taking",
  question: "What does OPQRST help assess?",
  answers: [
    "Pain or a chief complaint",
    "The ambulance engine",
    "Legal consent only",
    "Patient weight"
  ],
  correct: 0,
  explanation: "OPQRST helps assess pain or symptoms: onset, provocation, quality, radiation, severity, and time."
},
{
  chapter: 9,
  topic: "Secondary Assessment",
  question: "What is the purpose of the secondary assessment?",
  answers: [
    "To look more closely for injuries or medical findings",
    "To skip vital signs",
    "To replace the primary assessment",
    "To delay transport for every patient"
  ],
  correct: 0,
  explanation: "The secondary assessment is a more focused or detailed exam after life threats are addressed."
},
{
  chapter: 9,
  topic: "Reassessment",
  question: "Why is reassessment important?",
  answers: [
    "It checks whether the patient is improving, worsening, or staying the same",
    "It is only for paperwork",
    "It is done before scene safety",
    "It replaces transport"
  ],
  correct: 0,
  explanation: "Reassessment helps you monitor changes and decide if your treatment is working or if the patient is getting worse."
},
  {
  chapter: 10,
  topic: "Airway Management",
  question: "What is the purpose of suctioning?",
  answers: [
    "To remove fluids or secretions from the airway",
    "To give oxygen",
    "To check blood pressure",
    "To stop bleeding"
  ],
  correct: 0,
  explanation: "Suctioning helps remove vomit, blood, mucus, or other fluids from the airway."
},
{
  chapter: 10,
  topic: "Airway Management",
  question: "Which airway maneuver is commonly used when there is no suspected spinal injury?",
  answers: [
    "Jaw-thrust maneuver",
    "Head tilt-chin lift",
    "Chest compression",
    "Recovery drag"
  ],
  correct: 1,
  explanation: "The head tilt-chin lift is used to open the airway when spinal injury is not suspected."
},
{
  chapter: 10,
  topic: "Airway Management",
  question: "Which airway maneuver is preferred when spinal injury is suspected?",
  answers: [
    "Head tilt-chin lift",
    "Jaw-thrust maneuver",
    "Log roll only",
    "Finger sweep on every patient"
  ],
  correct: 1,
  explanation: "The jaw-thrust maneuver helps open the airway while limiting movement of the neck."
},
{
  chapter: 10,
  topic: "Airway Adjuncts",
  question: "What is an oropharyngeal airway also called?",
  answers: [
    "NPA",
    "OPA",
    "BVM",
    "AED"
  ],
  correct: 1,
  explanation: "An oropharyngeal airway is commonly called an OPA."
},
{
  chapter: 10,
  topic: "Airway Adjuncts",
  question: "When is an OPA usually used?",
  answers: [
    "In a conscious patient with a gag reflex",
    "In an unresponsive patient without a gag reflex",
    "In every patient with chest pain",
    "Only for walking patients"
  ],
  correct: 1,
  explanation: "An OPA is generally used for an unresponsive patient who does not have a gag reflex."
},
{
  chapter: 10,
  topic: "Airway Adjuncts",
  question: "What is a nasopharyngeal airway also called?",
  answers: [
    "NPA",
    "OPA",
    "BVM",
    "CPR"
  ],
  correct: 0,
  explanation: "A nasopharyngeal airway is commonly called an NPA."
},
{
  chapter: 10,
  topic: "Ventilation",
  question: "What device is commonly used to ventilate a patient who is not breathing adequately?",
  answers: [
    "Bag-valve mask",
    "Blood pressure cuff",
    "Stethoscope only",
    "Traction splint"
  ],
  correct: 0,
  explanation: "A bag-valve mask, or BVM, is used to provide positive-pressure ventilation."
},
{
  chapter: 10,
  topic: "Oxygen",
  question: "Which device can deliver high-concentration oxygen to a breathing patient?",
  answers: [
    "Nasal cannula",
    "Nonrebreather mask",
    "Bandage",
    "Backboard"
  ],
  correct: 1,
  explanation: "A nonrebreather mask can deliver a high concentration of oxygen to a patient who is breathing adequately."
},
{
  chapter: 10,
  topic: "Airway Management",
  question: "What sound may suggest fluid in the airway?",
  answers: [
    "Gurgling",
    "Clear speech",
    "Normal breathing",
    "Quiet relaxed breathing"
  ],
  correct: 0,
  explanation: "Gurgling can suggest fluid, vomit, blood, or secretions in the airway."
},
{
  chapter: 10,
  topic: "Ventilation",
  question: "What is an important sign that BVM ventilations are working?",
  answers: [
    "Chest rise with each ventilation",
    "The patient’s shoes move",
    "The oxygen tank gets colder only",
    "The mask is held loosely"
  ],
  correct: 0,
  explanation: "Visible chest rise is a key sign that air is entering the lungs during ventilation."
},
];

const flashcards = [





  // Chapter 6
  { chapter: 6, term: "Anatomical Position", definition: "Standing upright, facing forward, arms at sides, palms forward." },
  { chapter: 6, term: "Anterior", definition: "Toward the front of the body." },
  { chapter: 6, term: "Posterior", definition: "Toward the back of the body." },
  { chapter: 6, term: "Medial", definition: "Toward the midline." },
  { chapter: 6, term: "Lateral", definition: "Away from the midline." },
  { chapter: 6, term: "Respiratory System", definition: "System that brings oxygen in and removes carbon dioxide." },
  { chapter: 6, term: "Cardiovascular System", definition: "Heart and blood vessels that circulate blood." },
  { chapter: 6, term: "Nervous System", definition: "Brain, spinal cord, and nerves that control body functions." },
  { chapter: 6, term: "Red Blood Cells", definition: "Cells that carry oxygen to body tissues." },
  { chapter: 6, term: "Perfusion", definition: "Delivery of oxygen and nutrients to body tissues through blood flow." },
  { chapter: 6, term: "Superior", definition: "Toward the head or above." },
  { chapter: 6, term: "Inferior", definition: "Toward the feet or below." },
  { chapter: 6, term: "Proximal", definition: "Closer to the point of attachment." },
  { chapter: 6, term: "Distal", definition: "Farther from the point of attachment." },
  { chapter: 6, term: "Supine", definition: "Lying face up." },
  { chapter: 6, term: "Prone", definition: "Lying face down." },
  { chapter: 6, term: "Fowler Position", definition: "Sitting upright or semi-upright." },
  { chapter: 6, term: "Shock", definition: "Poor perfusion causing inadequate oxygen delivery to tissues." },
  { chapter: 6, term: "Homeostasis", definition: "The body’s ability to maintain internal balance." },
  { chapter: 6, term: "Integumentary System", definition: "Skin and related structures that protect the body." },
  { chapter: 6, term: "Anatomy", definition: "The structure of the body and where body parts are located." },
  { chapter: 6, term: "Physiology", definition: "How the body works normally." },
  { chapter: 6, term: "Pathophysiology", definition: "How disease or injury changes normal body function." },
  { chapter: 6, term: "Midline", definition: "An imaginary line that divides the body into right and left sides." },
  { chapter: 6, term: "Midsagittal Plane", definition: "Plane that divides the body into equal left and right halves." },
  { chapter: 6, term: "Sagittal Plane", definition: "Plane that divides the body into left and right portions." },
  { chapter: 6, term: "Frontal Plane", definition: "Plane that divides the body into front and back portions; also called coronal plane." },
  { chapter: 6, term: "Transverse Plane", definition: "Plane that divides the body into upper and lower portions; also called axial plane." },
  { chapter: 6, term: "Axial Skeleton", definition: "Skull, spine, ribs, and sternum." },
  { chapter: 6, term: "Appendicular Skeleton", definition: "Arms, legs, shoulders, and pelvis." },
  { chapter: 6, term: "Ligament", definition: "Connects bone to bone." },
  { chapter: 6, term: "Tendon", definition: "Connects muscle to bone." },
  { chapter: 6, term: "Cartilage", definition: "Smooth tissue covering the ends of bones at joints." },
  { chapter: 6, term: "Joint", definition: "Location where two bones meet." },
  { chapter: 6, term: "Skeletal Muscle", definition: "Voluntary muscle used for movement." },
  { chapter: 6, term: "Cervical Spine", definition: "Seven vertebrae in the neck." },
  { chapter: 6, term: "Thoracic Spine", definition: "Twelve vertebrae in the upper and mid back." },
  { chapter: 6, term: "Lumbar Spine", definition: "Five vertebrae in the lower back." },
  { chapter: 6, term: "Sacrum", definition: "Five fused vertebrae at the back of the pelvis." },
  { chapter: 6, term: "Coccyx", definition: "Four fused vertebrae forming the tailbone." },
  { chapter: 6, term: "Upper Airway", definition: "Nose, mouth, tongue, jaw, pharynx, and larynx." },
  { chapter: 6, term: "Lower Airway", definition: "Trachea, bronchi, bronchioles, and alveoli." },
  { chapter: 6, term: "Alveoli", definition: "Tiny air sacs where oxygen and carbon dioxide are exchanged." },
  { chapter: 6, term: "Diaphragm", definition: "Main muscle of breathing." },
  { chapter: 6, term: "Ventilation", definition: "Physical movement of air in and out of the lungs." },
  { chapter: 6, term: "Respiration", definition: "Exchange of oxygen and carbon dioxide." },
  { chapter: 6, term: "Inhalation", definition: "Breathing in." },
  { chapter: 6, term: "Exhalation", definition: "Breathing out." },
  { chapter: 6, term: "Agonal Gasps", definition: "Occasional gasping breaths in cardiac arrest; not adequate breathing." },
  { chapter: 6, term: "Pulmonary Circulation", definition: "Blood flow from the right heart to the lungs and back to the left heart." },
  { chapter: 6, term: "Systemic Circulation", definition: "Blood flow from the left heart to the body and back to the right heart." },
  { chapter: 6, term: "Myocardium", definition: "Heart muscle." },
  { chapter: 6, term: "Septum", definition: "Wall separating the right and left sides of the heart." },
  { chapter: 6, term: "Atrium", definition: "Upper chamber of the heart." },
  { chapter: 6, term: "Ventricle", definition: "Lower chamber of the heart." },
  { chapter: 6, term: "Coronary Arteries", definition: "Arteries that supply oxygenated blood to the heart muscle." },
  { chapter: 6, term: "Stroke Volume", definition: "Amount of blood ejected with one heartbeat." },
  { chapter: 6, term: "Cardiac Output", definition: "Amount of blood pumped in one minute; heart rate times stroke volume." },
  { chapter: 6, term: "Pulmonary Artery", definition: "Carries oxygen-poor blood away from the heart to the lungs." },
  { chapter: 6, term: "Pulmonary Vein", definition: "Carries oxygen-rich blood from the lungs back to the heart." },
  { chapter: 6, term: "Artery", definition: "Blood vessel that carries blood away from the heart." },
  { chapter: 6, term: "Arteriole", definition: "Small branch of an artery that leads blood into capillaries." },
  { chapter: 6, term: "Capillary", definition: "Tiny vessel where oxygen, nutrients, carbon dioxide, and wastes are exchanged." },
  { chapter: 6, term: "Venule", definition: "Small vessel that collects blood leaving capillaries and leads into veins." },
  { chapter: 6, term: "Vein", definition: "Blood vessel that carries blood back to the heart." },
  { chapter: 6, term: "Spleen", definition: "Left upper abdominal organ that filters and stores blood and can bleed severely if injured." },
  { chapter: 6, term: "Plasma", definition: "Liquid portion of blood that carries cells, nutrients, hormones, and wastes." },
  { chapter: 6, term: "Erythrocytes", definition: "Red blood cells that carry oxygen using hemoglobin." },
  { chapter: 6, term: "Hemoglobin", definition: "Protein in red blood cells that binds oxygen and gives blood its red color." },
  { chapter: 6, term: "Leukocytes", definition: "White blood cells that fight infection." },
  { chapter: 6, term: "Platelets", definition: "Blood components that help start clotting." },
  { chapter: 6, term: "Clotting Factors", definition: "Blood proteins that help form stable clots." },
  { chapter: 6, term: "Blood Pressure", definition: "Force of blood pushing against artery walls." },
  { chapter: 6, term: "Systole", definition: "Contraction phase when the left ventricle pumps blood out." },
  { chapter: 6, term: "Diastole", definition: "Relaxation phase when the ventricle fills with blood." },
  { chapter: 6, term: "Hypoperfusion", definition: "Inadequate blood flow to organs and tissues." },
  { chapter: 6, term: "Central Nervous System", definition: "Brain and spinal cord." },
  { chapter: 6, term: "Peripheral Nervous System", definition: "Nerves outside the brain and spinal cord." },
  { chapter: 6, term: "Somatic Nervous System", definition: "Controls voluntary actions such as walking." },
  { chapter: 6, term: "Autonomic Nervous System", definition: "Controls involuntary functions such as heart rate and digestion." },
  { chapter: 6, term: "Cerebrum", definition: "Brain area for thought, memory, sensation, and voluntary movement." },
  { chapter: 6, term: "Cerebellum", definition: "Brain area for coordination and balance." },
  { chapter: 6, term: "Brain Stem", definition: "Controls breathing, heart rate, blood pressure, and consciousness." },
  { chapter: 6, term: "Epidermis", definition: "Outer layer of skin." },
  { chapter: 6, term: "Dermis", definition: "Deeper skin layer containing sweat glands, nerves, and blood vessels." },
  { chapter: 6, term: "Subcutaneous Tissue", definition: "Fatty tissue beneath the skin." },
  { chapter: 6, term: "Cyanosis", definition: "Blue skin or mucous membranes that can indicate low oxygen." },
  { chapter: 6, term: "Pancreas", definition: "Organ involved in digestion and blood glucose regulation." },
  { chapter: 6, term: "Adrenal Glands", definition: "Endocrine glands that release epinephrine and norepinephrine during stress." },
  { chapter: 6, term: "Urinary System", definition: "Kidneys, ureters, bladder, and urethra; filters blood and removes waste through urine." },
  { chapter: 6, term: "Lymphatic System", definition: "System that supports immunity and fluid balance." },


  // Chapter 8
  { chapter: 8, term: "Body Mechanics", definition: "Using safe posture and movement to prevent injury while lifting." },
  { chapter: 8, term: "Power Lift", definition: "A lift using leg strength while keeping the back straight." },
  { chapter: 8, term: "Emergency Move", definition: "Rapid move used when there is immediate danger." },
  { chapter: 8, term: "Urgent Move", definition: "Move used when quick movement is needed but danger is not immediate." },
  { chapter: 8, term: "Nonurgent Move", definition: "Planned move used when the patient and scene are stable." },
  { chapter: 8, term: "Wheeled Stretcher", definition: "Device used to move and transport patients." },
  { chapter: 8, term: "Stair Chair", definition: "Device used to move patients on stairs." },
  { chapter: 8, term: "Log Roll", definition: "Coordinated roll used to move a patient while limiting spinal movement." },
  { chapter: 8, term: "Communication During Lifting", definition: "Using clear commands so rescuers move together." },
  { chapter: 8, term: "Additional Help", definition: "Extra personnel or equipment requested when a move is unsafe." },
  { chapter: 8, term: "Direct Ground Lift", definition: "Lift used to move a patient from the ground with multiple rescuers." },
  { chapter: 8, term: "Extremity Lift", definition: "Lift using the patient’s arms and legs when appropriate." },
  { chapter: 8, term: "Draw Sheet Method", definition: "Moving a patient by pulling a sheet underneath them." },
  { chapter: 8, term: "Scoop Stretcher", definition: "Device that separates and slides under a patient with less movement." },
  { chapter: 8, term: "Basket Stretcher", definition: "Stretcher used for rough terrain or rescue situations." },
  { chapter: 8, term: "Manual Stabilization", definition: "Holding the head or body part steady to reduce movement." },
  { chapter: 8, term: "Patient Packaging", definition: "Preparing and securing a patient for movement or transport." },
  { chapter: 8, term: "Lifting Partner", definition: "Another rescuer helping move a patient safely." },
  { chapter: 8, term: "Weight Distribution", definition: "How weight is shared during a lift or move." },
  { chapter: 8, term: "Safe Move", definition: "A move that protects both patient and rescuers from injury." },

  // Chapter 9
  { chapter: 9, term: "ABCDE", definition: "Primary assessment acronym. A = Airway, B = Breathing, C = Circulation, D = Disability/mental status, E = Exposure." },
{ chapter: 9, term: "SAMPLE", definition: "History-taking acronym. S = Signs/Symptoms, A = Allergies, M = Medications, P = Past medical history, L = Last oral intake, E = Events leading to the problem." },
{ chapter: 9, term: "OPQRST", definition: "Pain/symptom assessment acronym. O = Onset, P = Provocation/Palliation, Q = Quality, R = Radiation, S = Severity, T = Time." },
{ chapter: 9, term: "DCAP-BTLS", definition: "Trauma assessment acronym. D = Deformities, C = Contusions, A = Abrasions, P = Punctures/Penetrations, B = Burns, T = Tenderness, L = Lacerations, S = Swelling." },
{ chapter: 9, term: "PASTE", definition: "Respiratory history acronym. P = Progression/Provocation, A = Associated chest pain, S = Sputum, T = Talking/Tiredness, E = Exercise tolerance." },
{ chapter: 9, term: "PPE", definition: "Personal Protective Equipment. Used during scene size-up and before patient contact to protect yourself from hazards." },
{ chapter: 9, term: "BSI", definition: "Body Substance Isolation. Used during scene size-up to protect against blood, body fluids, and infectious material." },
{ chapter: 9, term: "SLUDGE", definition: "Possible cholinergic poisoning signs. S = Salivation, L = Lacrimation, U = Urination, D = Defecation, G = GI upset, E = Emesis." },
{ chapter: 9, term: "AEIOU-TIPS", definition: "Altered mental status causes. A = Alcohol/Acidosis, E = Epilepsy/Electrolytes, I = Insulin, O = Overdose/Oxygen, U = Uremia, T = Trauma/Temperature, I = Infection, P = Psychiatric/Poisoning, S = Stroke/Shock." },
{ chapter: 9, term: "ENAMES", definition: "Scene size-up memory tool. E = Environment, N = Number of patients, A = Additional resources, M = MOI/NOI, E = Extrication, S = Spinal precautions/Safety. Confirm with your instructor’s version." },
  { chapter: 9, term: "Scene Size-Up", definition: "First assessment step: check safety, number of patients, and needed resources." },
  { chapter: 9, term: "Primary Assessment", definition: "Quick assessment to find and treat life threats." },
  { chapter: 9, term: "Airway", definition: "The path air takes into and out of the lungs." },
  { chapter: 9, term: "Breathing", definition: "Checking rate, effort, chest rise, and signs of respiratory distress." },
  { chapter: 9, term: "Circulation", definition: "Checking pulse, major bleeding, and skin signs." },
  { chapter: 9, term: "SAMPLE", definition: "Signs/symptoms, allergies, medications, past history, last intake, events." },
  { chapter: 9, term: "OPQRST", definition: "Onset, provocation, quality, radiation, severity, and time." },
  { chapter: 9, term: "Secondary Assessment", definition: "More focused or detailed exam after life threats are addressed." },
  { chapter: 9, term: "Reassessment", definition: "Repeating assessment to check if the patient changes." },
  { chapter: 9, term: "Transport Decision", definition: "Decision about how quickly and where the patient should be transported." },
  { chapter: 9, term: "General Impression", definition: "Your first overall view of how sick or injured the patient appears." },
  { chapter: 9, term: "AVPU", definition: "Alert, verbal, painful, unresponsive; a quick mental status check." },
  { chapter: 9, term: "Chief Complaint", definition: "The patient’s main problem or reason EMS was called." },
  { chapter: 9, term: "DCAP-BTLS", definition: "Memory tool for injury assessment: deformities, contusions, abrasions, punctures, burns, tenderness, lacerations, swelling." },
  { chapter: 9, term: "Vital Signs", definition: "Measurements such as pulse, respirations, blood pressure, and skin signs." },
  { chapter: 9, term: "Baseline Vitals", definition: "First set of vital signs used for comparison later." },
  { chapter: 9, term: "Rapid Scan", definition: "Quick exam to find serious bleeding or life threats." },
  { chapter: 9, term: "Focused Assessment", definition: "Assessment focused on the patient’s main complaint or affected body system." },
  { chapter: 9, term: "Trending", definition: "Comparing repeated findings to see if the patient is improving or worsening." },
  { chapter: 9, term: "Priority Patient", definition: "A patient with signs of serious illness or injury needing rapid transport." },

  // Chapter 10
  { chapter: 10, term: "Airway Management", definition: "Keeping the airway open and clear so the patient can breathe." },
  { chapter: 10, term: "Head Tilt-Chin Lift", definition: "Airway maneuver used when spinal injury is not suspected." },
  { chapter: 10, term: "Jaw-Thrust Maneuver", definition: "Airway maneuver preferred when spinal injury is suspected." },
  { chapter: 10, term: "Suctioning", definition: "Removing blood, vomit, mucus, or secretions from the airway." },
  { chapter: 10, term: "OPA", definition: "Oropharyngeal airway used for an unresponsive patient without a gag reflex." },
  { chapter: 10, term: "NPA", definition: "Nasopharyngeal airway inserted through the nose to help maintain an airway." },
  { chapter: 10, term: "BVM", definition: "Bag-valve mask used to ventilate patients who are not breathing adequately." },
  { chapter: 10, term: "Nonrebreather Mask", definition: "Oxygen mask that can deliver high-concentration oxygen." },
  { chapter: 10, term: "Gurgling", definition: "Airway sound that may mean fluid is present." },
  { chapter: 10, term: "Chest Rise", definition: "Visible rise of the chest showing air is entering during ventilation." },
  { chapter: 10, term: "Patent Airway", definition: "An open airway that allows air to move in and out." },
  { chapter: 10, term: "Airway Obstruction", definition: "A blockage that prevents normal airflow." },
  { chapter: 10, term: "Snoring", definition: "Airway sound that may suggest the tongue is blocking the airway." },
  { chapter: 10, term: "Stridor", definition: "High-pitched sound that may suggest upper airway obstruction." },
  { chapter: 10, term: "Wheezing", definition: "Whistling lung sound often related to narrowed lower airways." },
  { chapter: 10, term: "Agonal Breathing", definition: "Irregular gasping breaths that are not adequate breathing." },
  { chapter: 10, term: "Ventilation", definition: "Moving air in and out of the lungs." },
  { chapter: 10, term: "Oxygenation", definition: "Getting oxygen into the blood." },
  { chapter: 10, term: "Nasal Cannula", definition: "Low-flow oxygen device placed in the nostrils." },
  { chapter: 10, term: "Pulse Oximetry", definition: "Tool that estimates oxygen saturation in the blood." }
];
