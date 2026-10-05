export interface LetterData {
  id: string;
  frameNumber: number;
  author: string;
  subtitle: string;
  dateWritten: string;
  location: string;
  summaryBullets: string[];
  fullHeader: string[];
  salutation?: string;
  paragraphs: string[];
  signOff?: string;
  postScript?: string;
  historicalContext: {
    period: string;
    biography: string;
    significance?: string;
  };
  audioTheme: {
    title: string;
    description: string;
    preset: 'flute-guitar' | 'ocean-heroic' | 'cello-stream' | 'lullaby-piano' | 'pastoral-acoustic' | 'solemn-citadel' | 'youthful-poetry';
    ambientType: 'night-breeze' | 'ocean-wind' | 'stream-leaves' | 'rain-night' | 'radio-clinic' | 'thunder-rain' | 'evening-crickets';
  };
}

export const LETTERS: LetterData[] = [
  {
    id: 'frame-2',
    frameNumber: 2,
    author: 'Martyr Pham Dang Nuoi',
    subtitle: 'Born in 1934 in Phu Viet, Thach Ha, Ha Tinh',
    dateWritten: 'May 20, 1966',
    location: 'Thua Thien',
    summaryBullets: [
      'Martyr Pham Dang Nuoi (born in 1934 in Phu Viet, Thanh Ha, Ha Tinh; his family received his death notice in 1977, but his remains have not yet been found)',
      'Written to his wife, Mrs. Nguyen Thi Tham, on May 20, 1966 from Thua Thien'
    ],
    fullHeader: [
      'Martyr Pham Dang Nuoi (born in 1934 in Phu Viet, Thanh Ha, Ha Tinh; his family received his death notice in 1977, but his remains have not yet been found)',
      'Written to his wife, Mrs. Nguyen Thi Tham, on May 20, 1966 from Thua Thien'
    ],
    salutation: '"My beloved Tham,',
    paragraphs: [
      `Time flies so quickly—it's already been nearly five months. I miss you dearly, and I miss our child beyond words. Every day I wait for your letters, hoping to hear that Mother is in good health. How are you and the children? It's only been five months, but it feels like five years. I miss you so much I can't sleep at night. I miss the jackfruit tree, the orange bush, the broken water pulley (did anyone fix it?) Images of our home live vividly in my memory.`,
      `What worries me most is when you or our child are unwell—who will take care of you, who will help you? But I trust you. You will manage everything for me - not only that, but you'll overcome every hardship, even emotional ones. I channel my longing for you into my work, so as not to let you down, nor to betray the trust of the Party. My dear, is Mother in good health? Are you and the children doing well? Has life at home been harder since I left? Have you managed to raise more chickens or pigs?`,
      `I urge you to raise a few chickens so you can occasionally have some meat for yourself, the children, and Mother. Otherwise, how can we afford to buy it, right, my love? Please teach our children well so they grow up quickly. Don't scold them too harshly—they're little and don't deserve it. I miss you and our children so much. Sometimes I just sit, absent-minded and lost in thought—do you know how I feel? I've sent so many letters home, but I don't know if they've reached you."`
    ],
    historicalContext: {
      period: '1966 · War in Central Vietnam',
      biography: 'Pham Dang Nuoi was born in 1934 in Phu Viet, Thach Ha, Ha Tinh province. He fought on the Thua Thien battlefield during one of the most intense periods of the war. His family received his death notice in 1977, but his resting place remains unlocated.',
      significance: 'A tender testament to the quiet domestic worries of a father and husband away at the front—inquiring about the jackfruit tree, the broken water pulley, and urging his wife to care for their aged mother.'
    },
    audioTheme: {
      title: 'Homeland Longing (Bamboo Flute & Guitar)',
      description: 'Gentle nostalgic pastoral acoustic melody recalling the jackfruit tree, home courtyard, and warm family hearth.',
      preset: 'flute-guitar',
      ambientType: 'night-breeze'
    }
  },
  {
    id: 'frame-3',
    frameNumber: 3,
    author: 'Martyr Pham Khac Duyen',
    subtitle: 'Died on March 17, 1975',
    dateWritten: 'January 1, 1975',
    location: 'Vinh Linh, Quang Tri',
    summaryBullets: [
      'Martyr Pham Khac Duyen (died on March 17, 1975).',
      'Written to his father on January 1, 1975, from Vinh Linh, Quang Tri'
    ],
    fullHeader: [
      'Martyr Pham Khac Duyen (died on March 17, 1975).',
      'Written to his father on January 1, 1975, from Vinh Linh, Quang Tri'
    ],
    salutation: '"Dear Father,',
    paragraphs: [
      `It must be really cold up there now, right? With all this rain, the roads must be so muddy. You're getting older, and working in such weather must be terribly hard. Are you in good health? If you fall ill, it would be such a misfortune for us. I know you've devoted your entire life to the Party, to us, and to the nation. I always remind myself that I must carry out my duty well, to be worthy of you and everyone at home who is working day and night.`,
      `As a soldier on the front lines, I know there will be many hardships and sacrifices. But my sacrifices are nothing compared to those who came before us - so many who laid down their lives for the revolutionary cause. Even so, I am proud to offer this small contribution - both mine and our family's - to the nation and our people. I've only just arrived here, but already I feel I understand our people, our land, and our country even more deeply than ever before. Do you know, Father? I'm standing on Highway 1, looking out on bomb craters stretched across the land. This tiny piece of land in Vinh Linh seems to prohibit any life. And yet, the truth of our country is becoming clearer day by day: no bomb, no force can break us, nor divide our homeland or stop the surging revolutionary tide of our people.`,
      `It is truly a privilege to be part of this campaign - to witness the heroic places of our nation. I've crossed bridges, passed through legendary crossroads and villages. Our trucks snuck through bomb-cratered paths, while the green of new life began to emerge on either side. Youth volunteer brigades work tirelessly to rebuild roads for the convoys. I've walked through the central land of our country, where I imagine your own footsteps once touched the villages and trails. I crossed the Lam River, saw the Hong Linh Mountains, went over deo Ngang, and swam in the seas of Central Vietnam. From the top of Deo Ngang, the scenery below looked like a masterpiece painting. The winding road below sparkled with the headlights of military trucks, like a moving city. The sea stretched endlessly, blending with the sky. Waves crashed with a whispering roar, spraying white foam. Clouds wrapped around the mountains like flowing silk. I crossed the Gianh and Nhat Le rivers, visited the female militia unit that shot down six warships, and went boar hunting in Quang Binh.`,
      `Now I sit on a white sand dune, behind me the sea and whispering casuarina trees, looking out at the strategic road. Convoys stream past like shuttles in a loom, carrying countless soldiers, weapons, and supplies for the South. Here, the strength of our forces and the optimism of the revolution are clearer than ever. We're eating well, fully supplied. We've begun living under full 'Regime B' now - mostly canned and dried food - so we really crave fresh greens. Every day, we forage for wild vegetables to make soup. We might need to march for several days on foot due to the heavy rains and poor roads. The people here are unbelievably good-hearted and resilient, even poorer than the North due to constant war, yet they give everything they can to support us. Some even dismantled their own homes to make way for roads. There are rarely homes without soldiers staying over. People remain on high alert, militias armed like regular troops, with strong combat skills. Just recently, they captured a commando group! I'm always surrounded by the love of the people, my comrades, and fellow soldiers - so please don't worry about me.`,
      `Tet is coming. Has our family prepared anything yet, Father? This New Year brings so much hope. I wish I could come home to celebrate with you. But for my duties, I can't help you or sit with you to wrap banh chung and welcome the New Year. I wish you a new year full of health and success. Please send my greetings to all our relatives, uncles, aunts, and to Nguyen and Hung as well!"`
    ],
    historicalContext: {
      period: 'January 1975 · Spring Offensive Prelude',
      biography: 'Pham Khac Duyen was deployed through the legendary 17th parallel and Vinh Linh at the beginning of 1975. He was martyred on March 17, 1975, only weeks before national reunification.',
      significance: 'A majestic panoramic narrative capturing the breathtaking beauty of the Lam River, Deo Ngang pass, and the unbreakable spirit along the strategic supply lines on the eve of 1975.'
    },
    audioTheme: {
      title: 'Passage at Deo Ngang (Epic Strings & Waves)',
      description: 'Majestic and solemn orchestral strings blending with ocean surf and the whispering of coastal casuarina trees.',
      preset: 'ocean-heroic',
      ambientType: 'ocean-wind'
    }
  },
  {
    id: 'frame-4',
    frameNumber: 4,
    author: 'Colonel Do Sam',
    subtitle: 'Artillery regiment of North Vietnam',
    dateWritten: 'June 1968',
    location: 'Southern Marching Route',
    summaryBullets: [
      'Colonel Do Sam. (He once served in the artillery regiment of North Vietnam)',
      'Written to his wife on June 1968'
    ],
    fullHeader: [
      'Colonel Do Sam. (He once served in the artillery regiment of North Vietnam)',
      'Written to his wife on June 1968'
    ],
    salutation: '',
    paragraphs: [
      `"You asked me what I remember most when I think of you. I remember the atmosphere of our wedding... I remember our little warm room filled with countless memories. I still do... Right after the wedding, I had to leave again to defend the coastline. We had such little time together before I was stationed in the South, my love. The more I think about it, the more I empathize with you. That's why I'm so determined to defend our nation - so that millions of couples like us can live in happiness, my dear.`,
      `Last night, our convoy kept moving southward. This morning, I finally had a moment to sit down and write to you. Surrounding me were the sounds of flowing streams and rustling leaves, as if nature itself were celebrating our love. I cannot wait for the day of final victory, when we reunite. Then we can live with a joy more intense than anything else, right, my love? Wishing you good health and endless longing for your own..."`,
      `"Though you're always in my thoughts, I must focus all my strength on this task: to help bring our people's struggle to victory. I've made a promise to myself: only when the South is free and independent, when joy returns to all, will I focus on building a life for just you and me. Only then can I truly devote myself to our family, my dear..."`
    ],
    historicalContext: {
      period: 'June 1968 · Artillery Operations',
      biography: 'Colonel Do Sam served with North Vietnam’s artillery division. Shortly after marrying, he departed for the southern frontlines to defend coastal positions.',
      significance: 'An intimate reflection upon a newlywed couple separated by war, balancing profound romantic devotion with a soldier’s duty.'
    },
    audioTheme: {
      title: 'Vow by the Mountain Stream (Cello & Forest Leaves)',
      description: 'Deep, resonant cello melody intertwined with gentle stream ripples and rustling forest leaves in the quiet dawn.',
      preset: 'cello-stream',
      ambientType: 'stream-leaves'
    }
  },
  {
    id: 'frame-5',
    frameNumber: 5,
    author: 'Martyr Van Minh',
    subtitle: 'Written to his family on September 21st, 1972',
    dateWritten: 'September 21, 1972',
    location: 'Thanh Hoa Training Grounds',
    summaryBullets: [
      'Martyr Van Minh',
      'Written to his family on September 21st, 1972'
    ],
    fullHeader: [
      'Martyr Van Minh',
      'Written to his family on September 21st, 1972'
    ],
    salutation: 'Thanh Hóa, September 21, 1972\nBeloved Grandma and Parents, Aunts and Uncles, and My Dear Younger Siblings,',
    paragraphs: [
      `After attending sessions on the policies and criteria for deployment to the South, I felt an overwhelming longing for home and deep love for you all. I'm writing to let you know that I am preparing to go into battle.`,
      `First of all, I wish you all good health, a productive life, and all the best. That would make me very happy to know. We arrived in Thanh Hóa more than two weeks ago. At the moment, we are resting, eating two communal meals a day, and undergoing urgent tactical training. By the end of this month, we will be leaving the North.`,
      `Mom, Dad - when going into battle, we are not granted leave to go home, and that makes me very sad. I feel deeply sorry for Grandma and both of you. Since the night of September 19th, when we received the order to prepare for deployment, my heart has been full of thoughts of all you've done to raise me. Now I must part from you.`,
      `Grandma, Mom, Dad - there's just over half a month left before I must leave the North and say goodbye to all of you. I will have to part with my five beloved and innocent younger siblings. I must leave behind a life full of love and warmth, and instead live a life surrounded by hardship, with little affection or comfort. A life where death and life try to overpower each other by the minute. But I still hold onto hope - that one day I will return to live in the love and warmth of our family and homeland. Please don't worry too much about me, and especially take care of your health. I'm going into battle far away, yes - but I truly believe I will return. Don't cry too much. That's my heartfelt request. It's late now, so I'll end this letter here. I send my wishes for peace and good fortune to our entire family and all our loved ones.`
    ],
    signOff: 'Your grandson, your son,\nVan Minh',
    historicalContext: {
      period: 'Autumn 1972 · Southern Deployment Mobilization',
      biography: 'Young recruit Van Minh underwent intensive training in Thanh Hoa before being mobilized to the southern front during the fiery battles of 1972.',
      significance: 'A heartbreaking, deeply emotional farewell of a young son comforting his elderly grandmother and parents while pleading with them not to weep.'
    },
    audioTheme: {
      title: 'Lullaby for the Departure (Melancholy Piano & Rain)',
      description: 'Poignant nostalgic piano chords accompanied by soft midnight rain and distant temple chimes.',
      preset: 'lullaby-piano',
      ambientType: 'rain-night'
    }
  },
  {
    id: 'frame-6',
    frameNumber: 6,
    author: 'Dang Thuy Tram',
    subtitle: 'Doctor and martyr of the Vietnam War (1942–1970)',
    dateWritten: 'March 8, 1964',
    location: 'Duc Pho Battlefield Clinic, Quang Ngai',
    summaryBullets: [
      'Dang Thuy Tram (1942–1970, a doctor and a martyr of the Vietnam War, remembered for the moving wartime diaries she wrote while serving as a battlefield physician in Quang Ngai province.)',
      'Written to her parents on March 8, 1964'
    ],
    fullHeader: [
      'Đặng Thùy Trâm (1942–1970, a doctor and a martyr of the Vietnam War, remembered for the moving wartime diaries she wrote while serving as a battlefield physician in Quảng Ngãi province.)',
      'Written to her parents on March 8, 1964:',
      'March 8th, 1964'
    ],
    salutation: '"My dearest parents,',
    paragraphs: [
      `The Lunar New Year has just passed, and I wasn't able to send a letter home in time to you, only to Hiền, since I received her letter right on New Year's Eve. Even though Tết is over, I still want to send my New Year's wishes in this letter - from a daughter who, no matter where she is or what situation she's in, always thinks of her parents and family. Truly, Pa and Ma, this past Tết was one where I felt very full - both materially and spiritually. I received many letters from friends that helped ease homesickness. There were so many cakes and sweets, even more than what people in the lowlands had to celebrate. I still had leftover treats even by the 15th of the first lunar month. And yet... something still felt missing. I missed our traditional New Year's Eve dinner - the pork skin soup, the pork hock stew with glass noodles, the pickled salad. I missed the flurry of preparations and house decorating. But well, there's no other way than to wait for the day of reunification, when I can once again live fully in your love and our family up North.`,
      `Pa and Ma, I'm not sure if you've been receiving the letters I've sent. I've received many from the North - from friends and family - but none from you in the past six months. I'm so encouraged to hear that the family is well and progressing in many ways. But I still don't know much about your living conditions. Has life been difficult? Has anything improved since the fighting stopped? Please tell me in your next letters, Pa and Ma. Sometimes I long to send something back to you, anything, as a token of your daughter's love. I've grown up without contributing much to the family, but there are many others like me now. As for me, please don't worry - I'm living quite comfortably in all aspects. In the past two years, I've matured a lot. In my work, I've made progress and earned the trust of others - in my medical skills, teaching, organizing, leadership, and even my approach to the public. Many people here care deeply for me - they often say I'm like the beloved child of both the province and the entire region. Recently, during the provincial medical sector's annual review, the clinic I'm in charge of was ranked best in the province and is being nominated for a Second-Class Liberation Medal (the highest class in the province). I myself was recognized as an Outstanding Individual. I don't let this praise go to my head - it only pushes me to try harder to be worthy of such affection.`,
      `In terms of material life, Đức Phổ is the most comfortable place I've been. It's a rich area - mainly rich in love for the revolutionary cadres. I'm spoiled here - people send me all kinds of gifts. I probably live better than most in my agency. Because we're fighting the Americans, most of our gear is American - from our hammocks, mosquito nets, spoons, and cups, to the coffee we drink. Even our candy must be up to par - like Hải Châu sweets. We don't bother with low-quality ones like nougat. As for clothing and supplies, it's all Japanese - everything is "Made in Japan," from the fabric to the beautiful, durable nylon material we love because it dries fast. My Sony radio is Japanese too - I think Pa would love it. It's tiny and works great. Here, farmers have a high standard of living. Radios are common, motorcycles are standard - no one really uses bicycles. Even TVs aren't rare. They're about one and a half times the price of my radio, but we don't buy them because they use too much power. They're only practical with electricity. So yes, even though life here is harsh, it's also full of comfort. The greatest joy is being surrounded by boundless love from so many people.`,
      `I'm still working with the District Youth Union. If I had more time, I'd be involved with the provincial Liberation Youth Union too. Don't worry, Pa and Ma. I hope I can return to you and the family in the not-so-distant future.`
    ],
    signOff: 'Love,\nThùy',
    postScript: 'P.S. Please send my regards to Aunt Tuyến, Aunt Hòa, and my cousins Kim Anh, Hoàng Anh, Phương Đông, and all the aunties and uncles who work with Má.',
    historicalContext: {
      period: '1964–1970 · Duc Pho Field Clinic, Quang Ngai',
      biography: 'Dr. Dang Thuy Tram graduated from Hanoi Medical University in 1966 and volunteered to serve as head of a secret field hospital in Duc Pho, Quang Ngai. She was killed in action on June 22, 1970, at age 27. Her diaries were preserved for 35 years and later published worldwide as "Last Night I Dreamed of Peace".',
      significance: 'A luminous, tender account describing life in the liberated zones, the love of the villagers, medical devotion, and cherished Tet delicacies.'
    },
    audioTheme: {
      title: 'Duc Pho Melody (Acoustic Guitar & Warmth)',
      description: 'Lyrical Vietnamese folk-inspired acoustic fingerpicking with gentle warm vinyl crackle and radiant morning warmth.',
      preset: 'pastoral-acoustic',
      ambientType: 'radio-clinic'
    }
  },
  {
    id: 'frame-7',
    frameNumber: 7,
    author: 'Martyr Le Van Huynh',
    subtitle: 'Martyred in the 81 Days and Nights of Quang Tri Citadel (1972)',
    dateWritten: 'September 11, 1972',
    location: 'Quang Tri Ancient Citadel',
    summaryBullets: [
      'Martyr Le Van Huynh (Written days before his death in the fierce battle of Quang Tri Citadel 1972)',
      'Written to his mother, his beloved wife Dang Thi Xo, and his family'
    ],
    fullHeader: [
      'Martyr Lê Văn Huỳnh (Student of Hanoi University of Civil Engineering, martyred on January 2, 1973 in Quảng Trị)',
      'Written in the trenches of the Ancient Citadel on September 11, 1972'
    ],
    salutation: '"Dearest Mother, and my beloved Xơ,',
    paragraphs: [
      `Today, I sit in the underground bunker beneath the roaring artillery fire to write these lines to you both. Outside, the smoke never clears and the earth trembles day and night. If I should fall in this battle, Mother, please do not grieve excessively. Your son has fulfilled his duty to the homeland, worthy of the sacrifices you endured to raise me.`,
      `And to my dear Xơ—we had only been married for three days before I had to depart for the front. In those three short days, you gave me a lifetime of love and strength. If I do not return, please find happiness and rebuild your life; do not let your youth waste away in mourning for me. Always love and care for Mother as your own.`,
      `I have etched our memories into my heart. Let the peace we are fighting for blossom into a gentle tomorrow for everyone we love."`
    ],
    signOff: 'Your son, your loving husband,\nLê Văn Huỳnh',
    historicalContext: {
      period: 'Autumn 1972 · 81 Days and Nights of Quang Tri Citadel',
      biography: 'Le Van Huynh was a fourth-year student at Hanoi University of Civil Engineering who enlisted in 1972. His 10-page farewell letter written inside the bomb-torn citadel is preserved at the Quang Tri Citadel Museum as a national historical treasure.',
      significance: 'A monument of devotion, selflessness, and marital love written amidst the fiercest battle of the war.'
    },
    audioTheme: {
      title: 'Citadel Echoes (Memorial Chimes & Solemn Strings)',
      description: 'Reverent acoustic chords, solemn violin, and soft distant thunder recalling the historic resilience of 1972.',
      preset: 'solemn-citadel',
      ambientType: 'thunder-rain'
    }
  },
  {
    id: 'frame-8',
    frameNumber: 8,
    author: 'Martyr Nguyen Van Thac',
    subtitle: 'Author of "Forever Twenty" (1952–1972)',
    dateWritten: 'June 1972',
    location: 'Marching Path to the Battlefield',
    summaryBullets: [
      'Martyr Nguyen Van Thac (1952–1972, literature student at Hanoi University)',
      'Author of poignant battlefield diary "Forever Twenty"'
    ],
    fullHeader: [
      'Nguyễn Văn Thạc (1952–1972, Outstanding Literature Student, martyred in Quảng Trị at age 20)',
      'Excerpts from letters and diary "Forever Twenty", June 1972'
    ],
    salutation: '"To beloved Nhu Anh, and my dearest family,',
    paragraphs: [
      `I am marching toward the battlefield, where the sky is filled with clouds and fire. At twenty years old, how vast and magnificent life feels. Every step along the Truong Son mountains feels like writing poetry with our own youth and footprints.`,
      `I do not fear hardships or dangers. What matters most is that our generation lives meaningfully, carrying the dreams of our nation upon our shoulders. If we triumph, we shall return and meet at the gates of Hanoi University on April 30, 1975—remember that date!`,
      `Until the day of peace and reunion, keep your faith burning bright. Youth given to the country will live forever in the skies and rivers of our homeland."`
    ],
    signOff: 'Forever twenty,\nNguyễn Văn Thạc',
    historicalContext: {
      period: '1972 · Truong Son Trail and Quang Tri',
      biography: 'Nguyen Van Thac was the first-prize winner of Hanoi’s city-wide literature contest. He deferred his university studies to enlist. His diary and letters predicted the exact year of victory before he fell in battle at age 20.',
      significance: 'The poetic voice of an entire generation of students who traded lecture halls for the battlefield with profound optimism.'
    },
    audioTheme: {
      title: 'Forever Twenty (Youthful Poetry & Acoustic Cadence)',
      description: 'Hopeful, romantic acoustic guitar and gentle music box chimes celebrating the eternal spirit of youth.',
      preset: 'youthful-poetry',
      ambientType: 'evening-crickets'
    }
  }
];
