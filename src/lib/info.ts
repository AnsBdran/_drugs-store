import type { UNITS } from '@prisma/client';

export const countries = [
	'Afghanistan',
	'Albania',
	'Algeria',
	'Andorra',
	'Angola',
	'Antigua and Barbuda',
	'Argentina',
	'Armenia',
	'Australia',
	'Austria',
	'Azerbaijan',
	'Bahamas',
	'Bahrain',
	'Bangladesh',
	'Barbados',
	'Belarus',
	'Belgium',
	'Belize',
	'Benin',
	'Bhutan',
	'Bolivia',
	'Bosnia and Herzegovina',
	'Botswana',
	'Brazil',
	'Brunei',
	'Bulgaria',
	'Burkina Faso',
	'Burundi',
	'Cabo Verde',
	'Cambodia',
	'Cameroon',
	'Canada',
	'Central African Republic',
	'Chad',
	'Chile',
	'China',
	'Colombia',
	'Comoros',
	'Congo',
	'Costa Rica',
	'Croatia',
	'Cuba',
	'Cyprus',
	'Czech Republic',
	'Denmark',
	'Djibouti',
	'Dominica',
	'Dominican Republic',
	'Ecuador',
	'Egypt',
	'El Salvador',
	'Equatorial Guinea',
	'Eritrea',
	'Estonia',
	'Eswatini',
	'Ethiopia',
	'Fiji',
	'Finland',
	'France',
	'Gabon',
	'Gambia',
	'Georgia',
	'Germany',
	'Ghana',
	'Greece',
	'Grenada',
	'Guatemala',
	'Guinea',
	'Guinea-Bissau',
	'Guyana',
	'Haiti',
	'Honduras',
	'Hungary',
	'Iceland',
	'India',
	'Indonesia',
	'Iran',
	'Iraq',
	'Ireland',
	'Israel',
	'Italy',
	'Jamaica',
	'Japan',
	'Jordan',
	'Kazakhstan',
	'Kenya',
	'Kiribati',
	'Kuwait',
	'Kyrgyzstan',
	'Laos',
	'Latvia',
	'Lebanon',
	'Lesotho',
	'Liberia',
	'Libya',
	'Liechtenstein',
	'Lithuania',
	'Luxembourg',
	'Madagascar',
	'Malawi',
	'Malaysia',
	'Maldives',
	'Mali',
	'Malta',
	'Marshall Islands',
	'Mauritania',
	'Mauritius',
	'Mexico',
	'Micronesia',
	'Moldova',
	'Monaco',
	'Mongolia',
	'Montenegro',
	'Morocco',
	'Mozambique',
	'Myanmar',
	'Namibia',
	'Nauru',
	'Nepal',
	'Netherlands',
	'New Zealand',
	'Nicaragua',
	'Niger',
	'Nigeria',
	'North Macedonia',
	'Norway',
	'Oman',
	'Pakistan',
	'Palau',
	'Palestine',
	'Panama',
	'Papua New Guinea',
	'Paraguay',
	'Peru',
	'Philippines',
	'Poland',
	'Portugal',
	'Qatar',
	'Romania',
	'Russia',
	'Rwanda',
	'Saint Kitts and Nevis',
	'Saint Lucia',
	'Saint Vincent and the Grenadines',
	'Samoa',
	'San Marino',
	'Sao Tome and Principe',
	'Saudi Arabia',
	'Senegal',
	'Serbia',
	'Seychelles',
	'Sierra Leone',
	'Singapore',
	'Slovakia',
	'Slovenia',
	'Solomon Islands',
	'Somalia',
	'South Africa',
	'South Korea',
	'South Sudan',
	'Spain',
	'Sri Lanka',
	'Sudan',
	'Suriname',
	'Sweden',
	'Switzerland',
	'Syria',
	'Taiwan',
	'Tajikistan',
	'Tanzania',
	'Thailand',
	'Timor-Leste',
	'Togo',
	'Tonga',
	'Trinidad and Tobago',
	'Tunisia',
	'Turkey',
	'Turkmenistan',
	'Tuvalu',
	'Uganda',
	'Ukraine',
	'United Arab Emirates',
	'United Kingdom',
	'United States',
	'Uruguay',
	'Uzbekistan',
	'Vanuatu',
	'Vatican City',
	'Venezuela',
	'Vietnam',
	'Yemen',
	'Zambia',
	'Zimbabwe'
];

export const drugStrengths = [
	{ amount: '1mg', per: 'unit' },
	{ amount: '2mg', per: 'unit' },
	{ amount: '5mg', per: 'unit' },
	{ amount: '10mg', per: 'unit' },
	{ amount: '20mg', per: 'unit' },
	{ amount: '25mg', per: 'unit' },
	{ amount: '50mg', per: 'unit' },
	{ amount: '75mg', per: 'unit' },
	{ amount: '100mg', per: 'unit' },
	{ amount: '150mg', per: 'unit' },
	{ amount: '200mg', per: 'unit' },
	{ amount: '250mg', per: 'unit' },
	{ amount: '300mg', per: 'unit' },
	{ amount: '400mg', per: 'unit' },
	{ amount: '500mg', per: 'unit' },
	{ amount: '600mg', per: 'unit' },
	{ amount: '750mg', per: 'unit' },
	{ amount: '800mg', per: 'unit' },
	{ amount: '900mg', per: 'unit' },
	{ amount: '1000mg', per: 'unit' },
	{ amount: '2.5mg', per: 'unit' },
	{ amount: '7.5mg', per: 'unit' },
	{ amount: '12.5mg', per: 'unit' },
	{ amount: '17.5mg', per: 'unit' },
	{ amount: '37.5mg', per: 'unit' },
	{ amount: '62.5mg', per: 'unit' },
	{ amount: '125mg', per: 'unit' },
	{ amount: '1500mg', per: 'unit' },
	{ amount: '180mg', per: 'unit' },
	{ amount: '360mg', per: 'unit' },
	{ amount: '0.5mg', per: 'unit' },
	{ amount: '0.25mg', per: 'unit' },
	{ amount: '0.75mg', per: 'unit' },
	{ amount: '1.25mg', per: 'unit' },
	{ amount: '0.1mg', per: 'unit' },
	{ amount: '0.2mg', per: 'unit' },
	{ amount: '0.3mg', per: 'unit' },
	{ amount: '1g', per: 'unit' },
	{ amount: '1.5g', per: 'unit' },
	{ amount: '2g', per: 'unit' },
	{ amount: '3g', per: 'unit' },
	{ amount: '4g', per: 'unit' },
	{ amount: '5g', per: 'unit' },
	{ amount: '6g', per: 'unit' },
	{ amount: '8g', per: 'unit' },
	{ amount: '10g', per: 'unit' },

	{ amount: '200mg', per: '100ml' },
	{ amount: '400mg', per: '100ml' },
	{ amount: '600mg', per: '100ml' },
	{ amount: '800mg', per: '100ml' },
	{ amount: '1000mg', per: '100ml' },
	{ amount: '1200mg', per: '100ml' },
	{ amount: '1400mg', per: '100ml' },
	{ amount: '1600mg', per: '100ml' },
	{ amount: '1800mg', per: '100ml' },
	{ amount: '2000mg', per: '100ml' },
	{ amount: '250mg', per: '5ml' },
	{ amount: '500mg', per: '5ml' },
	{ amount: '750mg', per: '5ml' },
	{ amount: '1000mg', per: '5ml' },
	{ amount: '1500mg', per: '5ml' },
	{ amount: '2000mg', per: '5ml' },
	{ amount: '2500mg', per: '5ml' },
	{ amount: '3000mg', per: '5ml' },
	{ amount: '3500mg', per: '5ml' },
	{ amount: '4000mg', per: '5ml' }
];

export const drugForms = [
	'Aerosol',
	'Balm',
	'Capsule',
	'Cream',
	'Elixir',
	'Emulsion',
	'Foam',
	'Gel',
	'Inhalant',
	'Injection',
	'Liquid',
	'Lotion',
	'Mask',
	'Oil',
	'Ointment',
	'Patch',
	'Pill',
	'Powder',
	'Serum',
	'Solution',
	'Spray',
	'Suppository',
	'Suspension',
	'Syrup',
	'Tablet',
	'Tincture',
	'Toothpaste',
	'Mouthwash',
	'Skin Care',
	'Cosmetic',
	'Shampoo',
	'Paste',
	'Gum',
	'Drops',
	'Pellet',
	'Caplet',
	'Poultice',
	'Lozenge',
	'Granules',
	'Implant',
	'Medicated Soap',
	'Eye Droper',
	'Nasal Spray',
	'Inhaler'
];
export const indications = [
	'Pain',
	'Fever',
	'Inflammation',
	'Migraine',
	'Stroke',
	'Heartburn',
	'Nausea',
	'Cough',
	'Cold',
	'Flu',
	'Diarrhea',
	'Constipation',
	'Allergy',
	'Rash',
	'Headache',
	'Dizziness',
	'Fatigue',
	'Insomnia',
	'Anxiety',
	'Depression',
	'Arthritis',
	'Diabetes',
	'Hypertension',
	'Asthma',
	'Bronchitis',
	'Pneumonia',
	'Cancer',
	'Ulcer',
	'Gastritis',
	'Hemorrhoids',
	'Acne',
	'Angina',
	'Anemia',
	'Anorexia',
	'Arrhythmia',
	'Atherosclerosis',
	'Backache',
	'Bleeding',
	'Blisters',
	'Burns',
	'Cholesterol',
	'Colitis',
	'Conjunctivitis',
	'Cramps',
	'Dermatitis',
	'Dyspepsia',
	'Eczema',
	'Edema',
	'Emphysema',
	'Epilepsy',
	'Fibromyalgia',
	'Flatulence',
	'Glaucoma',
	'Gout',
	'Herpes',
	'Hyperthyroidism',
	'Hypothyroidism',
	'Impotence',
	'Infection',
	'Influenza',
	'Itching',
	'Jaundice',
	'Leukemia',
	'Lymphoma',
	'Malaria',
	'Menopause',
	'Menstruation',
	'Myalgia',
	'Neuralgia',
	'Obesity',
	'Osteoporosis',
	'Palpitations',
	'Pancreatitis',
	'Psoriasis',
	'Scabies',
	'Sinusitis',
	'Sneezing',
	'Spasms',
	'Swelling',
	'Syphilis',
	'Tetanus',
	'Thrombosis',
	'Tinnitus',
	'Tuberculosis',
	'Ulceration',
	'Vomiting',
	'Warts',
	'Wheezing',
	'Yeast',
	'Tendonitis',
	'Carpal Tunnel',
	'Restless Leg Syndrome',
	'Rosacea',
	'Gingivitis',
	'Multiple Sclerosis',
	'Parkinson’s Disease',
	'Polymyalgia Rheumatica'
];

export const contraIndications = [
	'Allergy',
	'Pregnancy',
	'Lactation',
	'Hypersensitivity',
	'Anemia',
	'Asthma',
	'Bleeding',
	'Breastfeeding',
	'Cancer',
	'Cardiomyopathy',
	'Cirrhosis',
	'Colitis',
	'Coma',
	'Dehydration',
	'Depression',
	'Diabetes',
	'Diarrhea',
	'Emphysema',
	'Epilepsy',
	'Glaucoma',
	'Gout',
	'Hepatitis',
	'Hypertension',
	'Hypotension',
	'Hyperthyroidism',
	'Hypothyroidism',
	'Infection',
	'Inflammation',
	'Jaundice',
	'Kidney',
	'Liver',
	'Malnutrition',
	'Menopause',
	'Menstruation',
	'Migraine',
	'Myocarditis',
	'Obesity',
	'Osteoporosis',
	'Pancreatitis',
	'Parkinson',
	'Peptic',
	'Psychosis',
	'Seizures',
	'Shock',
	'Stomach',
	'Stroke',
	'Surgery',
	'Thrombosis',
	'Tuberculosis',
	'Ulcer',
	'Vertigo',
	'Vomiting',
	'Cardiac Failure',
	'Arrhythmias',
	'Addison’s Disease',
	'Adrenal Insufficiency',
	'Alcoholism',
	'Aortic Stenosis',
	'Autoimmune Disease'
];

export const activeIngredients = [
	'Aspirin',
	'Ibuprofen',
	'Paracetamol',
	'Amoxicillin',
	'Metformin',
	'Atorvastatin',
	'Omeprazole',
	'Lisinopril',
	'Simvastatin',
	'Levothyroxine',
	'Amlodipine',
	'Metoprolol',
	'Hydrochlorothiazide',
	'Losartan',
	'Gabapentin',
	'Citalopram',
	'Albuterol',
	'Prednisone',
	'Acetaminophen',
	'Ciprofloxacin',
	'Clindamycin',
	'Doxycycline',
	'Furosemide',
	'Hydrocodone',
	'Hydroxychloroquine',
	'Indomethacin',
	'Loratadine',
	'Meloxicam',
	'Methotrexate',
	'Metronidazole',
	'Montelukast',
	'Naproxen',
	'Nifedipine',
	'Ondansetron',
	'Oxycodone',
	'Pantoprazole',
	'Prednisolone',
	'Ranitidine',
	'Sertraline',
	'Sildenafil',
	'Spironolactone',
	'Sumatriptan',
	'Tamsulosin',
	'Tetracycline',
	'Tramadol',
	'Trimethoprim',
	'Valsartan',
	'Venlafaxine',
	'Warfarin',
	'Zolpidem',
	'Acetazolamide',
	'Alendronate',
	'Allopurinol',
	'Azithromycin',
	'Bisoprolol',
	'Budesonide',
	'Carbamazepine',
	'Cefalexin',
	'Cetirizine',
	'Chlorphenamine',
	'Chlorpromazine',
	'Clopidogrel',
	'Codeine',
	'Cyclobenzaprine',
	'Dexamethasone',
	'Diazepam',
	'Digoxin',
	'Diphenhydramine',
	'Duloxetine',
	'Enalapril',
	'Esomeprazole',
	'Fluconazole',
	'Fluoxetine',
	'Folic',
	'Glyburide',
	'Gemfibrozil',
	'Glipizide',
	'Haloperidol',
	'Hydralazine',
	'Hydromorphone',
	'Hydroxyzine',
	'Isosorbide',
	'Ketoconazole',
	'Labetalol',
	'Lamotrigine',
	'Levofloxacin',
	'Lidocaine',
	'Lithium',
	'Loperamide',
	'Methocarbamol',
	'Methylprednisolone',
	'Minocycline',
	'Mirtazapine',
	'Nalbuphine',
	'Nitrofurantoin',
	'Nitroglycerin',
	'Nortriptyline',
	'Olanzapine',
	'Oxcarbazepine',
	'Phenobarbital',
	'Phenytoin',
	'Pioglitazone',
	'Prazosin',
	'Propranolol',
	'Scopolamine',
	'Tizanidine',
	'Tolterodine',
	'Topiramate',
	'Valproate',
	'Verapamil',
	'Metamizole',
	'Rivaroxaban',
	'Clarithromycin',
	'Mometasone',
	'Aciclovir',
	'Brimonidine',
	'Isotretinoin',
	'Apixaban',
	'Fentanyl',
	'Risperidone',
	'Ropinirole'
];

export const drugCategories = [
	{ name: 'Analgesic', description: 'Used to relieve pain.' },
	{ name: 'Antibiotic', description: 'Used to treat bacterial infections.' },
	{ name: 'Antifungal', description: 'Used to treat fungal infections.' },
	{ name: 'Antipyretic', description: 'Used to reduce fever.' },
	{ name: 'Antiseptic', description: 'Used to prevent infection in wounds.' },
	{ name: 'Antidepressant', description: 'Used to treat depression.' },
	{ name: 'Antipsychotic', description: 'Used to manage psychosis, including schizophrenia.' },
	{ name: 'Anticonvulsant', description: 'Used to prevent seizures.' },
	{ name: 'Antihistamine', description: 'Used to relieve allergy symptoms.' },
	{ name: 'Antihypertensive', description: 'Used to lower blood pressure.' },
	{ name: 'Diuretic', description: 'Used to remove excess fluid from the body.' },
	{
		name: 'Bronchodilator',
		description: 'Used to relax muscles of the airways and increase airflow to the lungs.'
	},
	{ name: 'Decongestant', description: 'Used to relieve nasal congestion.' },
	{ name: 'Laxative', description: 'Used to relieve constipation.' },
	{ name: 'Sedative', description: 'Used to induce calmness and sleep.' },
	{ name: 'Stimulant', description: 'Used to increase alertness and energy.' },
	{ name: 'Anti-inflammatory', description: 'Used to reduce inflammation.' },
	{ name: 'Antiemetic', description: 'Used to prevent vomiting.' },
	{ name: 'Anticoagulant', description: 'Used to prevent blood clotting.' },
	{ name: 'Hypnotic', description: 'Used to induce sleep.' },
	{ name: 'Hormone', description: 'Used to replace or supplement naturally occurring hormones.' },
	{ name: 'Vaccine', description: 'Used to provide immunity against various diseases.' },
	{ name: 'Antiviral', description: 'Used to treat viral infections.' },
	{ name: 'Immunosuppressant', description: 'Used to suppress the immune system.' },
	{ name: 'Antidiabetic', description: 'Used to control blood sugar levels in diabetes.' },
	{ name: 'Statin', description: 'Used to lower cholesterol levels.' },
	{ name: 'Muscle Relaxant', description: 'Used to relieve muscle spasms.' },
	{ name: 'Expectorant', description: 'Used to help clear mucus from the airways.' },
	{ name: 'Antispasmodic', description: 'Used to relieve muscle spasms.' },
	{
		name: 'Antiplatelet',
		description: 'Used to prevent blood cells from sticking together and forming a clot.'
	},
	{
		name: 'Corticosteroid',
		description: 'Used to reduce inflammation and suppress the immune system.'
	},
	{ name: 'Antiglaucoma', description: 'Used to treat glaucoma.' },
	{ name: 'Osteoporosis', description: 'Used to treat and prevent osteoporosis.' },
	{ name: 'Gastroprotective', description: 'Used to protect the gastrointestinal tract.' },
	{ name: 'Probiotic', description: 'Used to promote a healthy balance of gut bacteria.' },
	{ name: 'Antiarrhythmic', description: 'Used to treat irregular heartbeats.' },
	{ name: 'Antiparasitic', description: 'Used to treat parasitic infections.' },
	{ name: 'Antithyroid', description: 'Used to treat hyperthyroidism.' },
	{ name: 'Antimalarial', description: 'Used to prevent or treat malaria.' },
	{ name: 'Chemotherapy', description: 'Used to treat cancer.' },
	{
		name: 'Anticholinergic',
		description: 'Used to treat a variety of conditions, including incontinence and COPD.'
	}
];

export const dosageInstructions: {
	minAge: number;
	maxAge: number;
	frequencyPerDay: number;
	amountPerDose: number;
	unit: UNITS;
}[] = [
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 3,
		amountPerDose: 2.5,
		unit: 'ml'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 2,
		amountPerDose: 5,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 1,
		amountPerDose: 250,
		unit: 'mg'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 5,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 2,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 3,
		amountPerDose: 10,
		unit: 'ml'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 250,
		unit: 'mg'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 4,
		amountPerDose: 2,
		unit: 'ml'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 3,
		amountPerDose: 4,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 7.5,
		unit: 'ml'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 1,
		amountPerDose: 750,
		unit: 'mg'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 15,
		unit: 'ml'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 1,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 4,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 1,
		amountPerDose: 3,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 3,
		amountPerDose: 3,
		unit: 'ml'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 2,
		amountPerDose: 6,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 1,
		amountPerDose: 300,
		unit: 'mg'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 6,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 600,
		unit: 'mg'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 2,
		amountPerDose: 600,
		unit: 'mg'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 3,
		amountPerDose: 12,
		unit: 'ml'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 600,
		unit: 'mg'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 300,
		unit: 'mg'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 4,
		amountPerDose: 2.5,
		unit: 'ml'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 3,
		amountPerDose: 5,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 8,
		unit: 'ml'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 1,
		amountPerDose: 800,
		unit: 'mg'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 16,
		unit: 'ml'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 600,
		unit: 'mg'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 1,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 4,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 1,
		amountPerDose: 3,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 3,
		amountPerDose: 2.5,
		unit: 'ml'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 2,
		amountPerDose: 5,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 1,
		amountPerDose: 250,
		unit: 'mg'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 5,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 2,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 3,
		amountPerDose: 10,
		unit: 'ml'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 250,
		unit: 'mg'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 4,
		amountPerDose: 2,
		unit: 'ml'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 3,
		amountPerDose: 4,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 7.5,
		unit: 'ml'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 1,
		amountPerDose: 750,
		unit: 'mg'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 15,
		unit: 'ml'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 1,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 4,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 1,
		amountPerDose: 3,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 3,
		amountPerDose: 2.5,
		unit: 'ml'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 2,
		amountPerDose: 5,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 1,
		amountPerDose: 250,
		unit: 'mg'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 5,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 2,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 3,
		amountPerDose: 10,
		unit: 'ml'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 250,
		unit: 'mg'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 4,
		amountPerDose: 2,
		unit: 'ml'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 3,
		amountPerDose: 4,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 7.5,
		unit: 'ml'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 1,
		amountPerDose: 750,
		unit: 'mg'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 15,
		unit: 'ml'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 1,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 4,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 1,
		amountPerDose: 3,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 3,
		amountPerDose: 2.5,
		unit: 'ml'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 2,
		amountPerDose: 5,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 1,
		amountPerDose: 250,
		unit: 'mg'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 5,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 2,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 3,
		amountPerDose: 10,
		unit: 'ml'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 250,
		unit: 'mg'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 4,
		amountPerDose: 2,
		unit: 'ml'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 3,
		amountPerDose: 4,
		unit: 'ml'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 7.5,
		unit: 'ml'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 1,
		amountPerDose: 750,
		unit: 'mg'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 15,
		unit: 'ml'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 500,
		unit: 'mg'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 1,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 2,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 0,
		maxAge: 2,
		frequencyPerDay: 4,
		amountPerDose: 0.5,
		unit: 'unit'
	},
	{
		minAge: 3,
		maxAge: 5,
		frequencyPerDay: 3,
		amountPerDose: 1,
		unit: 'unit'
	},
	{
		minAge: 6,
		maxAge: 12,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 13,
		maxAge: 18,
		frequencyPerDay: 1,
		amountPerDose: 3,
		unit: 'unit'
	},
	{
		minAge: 18,
		maxAge: 65,
		frequencyPerDay: 2,
		amountPerDose: 2,
		unit: 'unit'
	},
	{
		minAge: 65,
		maxAge: 100,
		frequencyPerDay: 1,
		amountPerDose: 1,
		unit: 'unit'
	}
];
