import { ISwamiJiRepository } from '@/domain/repositories/ISwamiJiRepository';
import { SwamiJi, Teaching, Quote, Event } from '@/domain/entities/SwamiJi';

export class MockSwamiJiRepository implements ISwamiJiRepository {
  async getSwamiJiInfo(): Promise<SwamiJi> {
    return {
      id: '1',
      name: {
        en: 'Swami Ji Maharaj',
        hi: 'स्वामी जी महाराज',
      },
      title: {
        en: 'Spiritual Master & Guide',
        hi: 'आध्यात्मिक गुरु और मार्गदर्शक',
      },
      bio: {
        en: 'A revered spiritual leader dedicated to spreading the teachings of ancient wisdom and guiding souls towards enlightenment. With decades of spiritual practice and teaching, Swami Ji has touched countless lives through divine grace.',
        hi: 'प्राचीन ज्ञान की शिक्षाओं को फैलाने और आत्माओं को आत्मज्ञान की ओर मार्गदर्शन करने के लिए समर्पित एक पूजनीय आध्यात्मिक नेता। दशकों की आध्यात्मिक साधना और शिक्षण के साथ, स्वामी जी ने दिव्य कृपा के माध्यम से अनगिनत जीवन को छुआ है।',
      },
      teachings: [],
      quotes: [],
      imageUrl: '/images/swamiji-portrait.svg',
      birthDate: '1950-01-01',
      achievements: [
        {
          id: '1',
          title: {
            en: 'Established Spiritual Ashram',
            hi: 'आध्यात्मिक आश्रम की स्थापना',
          },
          description: {
            en: 'Founded a spiritual center dedicated to meditation and self-realization',
            hi: 'ध्यान और आत्म-साक्षात्कार के लिए समर्पित एक आध्यात्मिक केंद्र की स्थापना',
          },
          year: '1985',
        },
        {
          id: '2',
          title: {
            en: 'Published Sacred Texts',
            hi: 'पवित्र ग्रंथों का प्रकाशन',
          },
          description: {
            en: 'Authored several books on spiritual wisdom and meditation practices',
            hi: 'आध्यात्मिक ज्ञान और ध्यान प्रथाओं पर कई पुस्तकें लिखीं',
          },
          year: '1995',
        },
      ],
    };
  }

  async getTeachings(): Promise<Teaching[]> {
    return [
      {
        id: '1',
        title: {
          en: 'The Path of Self-Realization',
          hi: 'आत्म-साक्षात्कार का मार्ग',
        },
        content: {
          en: 'True enlightenment comes from within. Through meditation and self-inquiry, we discover our divine nature and connect with the universal consciousness. The journey to self-realization begins with understanding that we are not merely physical beings, but spiritual entities experiencing a human existence. Every moment of introspection brings us closer to our true essence. When we quiet the mind and listen to the voice of our soul, we begin to see beyond the illusions of the material world. This sacred path requires patience, dedication, and unwavering faith in the divine process of awakening.',
          hi: 'सच्चा आत्मज्ञान भीतर से आता है। ध्यान और आत्म-जांच के माध्यम से, हम अपनी दिव्य प्रकृति की खोज करते हैं और सार्वभौमिक चेतना से जुड़ते हैं। आत्म-साक्षात्कार की यात्रा इस समझ से शुरू होती है कि हम केवल भौतिक प्राणी नहीं हैं, बल्कि आध्यात्मिक इकाइयाँ हैं जो मानव अस्तित्व का अनुभव कर रही हैं। आत्मनिरीक्षण का प्रत्येक क्षण हमें हमारे सच्चे सार के करीब लाता है। जब हम मन को शांत करते हैं और अपनी आत्मा की आवाज सुनते हैं, तो हम भौतिक दुनिया के भ्रमों से परे देखना शुरू कर देते हैं।',
        },
        category: 'spirituality',
        date: '2024-01-15',
      },
      {
        id: '2',
        title: {
          en: 'The Power of Meditation',
          hi: 'ध्यान की शक्ति',
        },
        content: {
          en: 'Regular meditation practice brings peace, clarity, and spiritual growth. It is the key to unlocking inner wisdom and divine connection. In the stillness of meditation, we find answers to questions that the rational mind cannot comprehend. The practice of sitting in silence allows us to transcend the constant chatter of thoughts and experience pure consciousness. Through consistent practice, meditation transforms not just our inner world, but reflects positively in our external reality. It strengthens our connection with the divine, enhances our intuition, and brings profound peace that remains unshaken by worldly turbulence.',
          hi: 'नियमित ध्यान अभ्यास शांति, स्पष्टता और आध्यात्मिक विकास लाता है। यह आंतरिक ज्ञान और दिव्य संबंध को अनलॉक करने की कुंजी है। ध्यान की स्थिरता में, हम उन सवालों के जवाब पाते हैं जिन्हें तर्कसंगत मन नहीं समझ सकता। मौन में बैठने का अभ्यास हमें विचारों की निरंतर गपशप को पार करने और शुद्ध चेतना का अनुभव करने की अनुमति देता है। निरंतर अभ्यास के माध्यम से, ध्यान न केवल हमारी आंतरिक दुनिया को बदल देता है, बल्कि हमारी बाहरी वास्तविकता में सकारात्मक रूप से प्रतिबिंबित होता है।',
        },
        category: 'meditation',
        date: '2024-02-20',
      },
      {
        id: '3',
        title: {
          en: 'Living in Harmony',
          hi: 'सामंजस्य में जीना',
        },
        content: {
          en: 'To live in harmony with nature and all beings is to follow the path of dharma. Practice compassion, kindness, and mindfulness in every action. The universe operates on the principle of interconnectedness, where every action creates ripples that affect the whole. When we align ourselves with the natural flow of existence, we experience effortless joy and abundance. Living in harmony means recognizing the divine spark in all creatures and treating everyone with love and respect. It requires us to be conscious of our thoughts, words, and deeds, ensuring they contribute positively to the collective consciousness. Through mindful living, we create a peaceful world both within and around us.',
          hi: 'प्रकृति और सभी प्राणियों के साथ सामंजस्य में रहना धर्म के मार्ग का अनुसरण करना है। हर कार्य में करुणा, दयालुता और सजगता का अभ्यास करें। ब्रह्मांड परस्पर जुड़ाव के सिद्धांत पर काम करता है, जहां प्रत्येक क्रिया ऐसी तरंगें पैदा करती है जो संपूर्ण को प्रभावित करती हैं। जब हम अपने आप को अस्तित्व के प्राकृतिक प्रवाह के साथ संरेखित करते हैं, तो हम सहज आनंद और प्रचुरता का अनुभव करते हैं। सामंजस्य में रहने का अर्थ है सभी प्राणियों में दिव्य चिंगारी को पहचानना और सभी के साथ प्रेम और सम्मान के साथ व्यवहार करना।',
        },
        category: 'lifestyle',
        date: '2024-03-10',
      },
    ];
  }

  async getQuotes(): Promise<Quote[]> {
    return [
      {
        id: '1',
        text: {
          en: 'The journey within is the greatest journey of all.',
          hi: 'भीतर की यात्रा सभी यात्राओं में सबसे महान है।',
        },
        context: {
          en: 'On the importance of self-discovery',
          hi: 'आत्म-खोज के महत्व पर',
        },
      },
      {
        id: '2',
        text: {
          en: 'In silence, we find the voice of the divine.',
          hi: 'मौन में, हम परमात्मा की आवाज पाते हैं।',
        },
        context: {
          en: 'On meditation and inner peace',
          hi: 'ध्यान और आंतरिक शांति पर',
        },
      },
      {
        id: '3',
        text: {
          en: 'Love is the highest form of worship.',
          hi: 'प्रेम पूजा का सर्वोच्च रूप है।',
        },
        context: {
          en: 'On devotion and compassion',
          hi: 'भक्ति और करुणा पर',
        },
      },
      {
        id: '4',
        text: {
          en: 'When the mind is still, the soul awakens.',
          hi: 'जब मन स्थिर होता है, तो आत्मा जागृत होती है।',
        },
        context: {
          en: 'On the power of stillness',
          hi: 'स्थिरता की शक्ति पर',
        },
      },
    ];
  }

  async getEvents(): Promise<Event[]> {
    return [
      {
        id: '1',
        title: {
          en: 'Meditation Retreat 2025',
          hi: 'ध्यान रिट्रीट 2025',
        },
        description: {
          en: 'Join us for a transformative 3-day meditation retreat in the serene mountains. Experience deep meditation, spiritual discourses, and divine grace.',
          hi: 'शांत पहाड़ों में एक परिवर्तनकारी 3-दिवसीय ध्यान रिट्रीट के लिए हमारे साथ जुड़ें। गहरे ध्यान, आध्यात्मिक प्रवचनों और दिव्य कृपा का अनुभव करें।',
        },
        date: '2025-12-15',
        location: {
          en: 'Himalayan Ashram, Rishikesh',
          hi: 'हिमालयी आश्रम, ऋषिकेश',
        },
        imageUrl: '/images/events/retreat.svg',
      },
      {
        id: '2',
        title: {
          en: 'Sacred Satsang Gathering',
          hi: 'पवित्र सत्संग सभा',
        },
        description: {
          en: 'Monthly gathering for devotees to receive blessings, spiritual teachings, and participate in collective meditation.',
          hi: 'भक्तों के लिए आशीर्वाद, आध्यात्मिक शिक्षाओं को प्राप्त करने और सामूहिक ध्यान में भाग लेने के लिए मासिक सभा।',
        },
        date: '2025-11-20',
        location: {
          en: 'Main Ashram Hall',
          hi: 'मुख्य आश्रम हॉल',
        },
        imageUrl: '/images/events/satsang.svg',
      },
    ];
  }
}
