export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: '公' | '母' | '雄性' | '雌性';
  location: string;
  distance: string;
  fee?: string;
  image: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  tags: string[];
  description: string;
  shelter: {
    name: string;
    address: string;
    distance: string;
    logo: string;
  };
  medical?: {
    vaccination: string;
    neutered: boolean;
    specialNeeds: string;
  };
  videoUrl?: string;
}

export const PETS: Pet[] = [
  {
    id: 'buddy',
    name: 'Buddy',
    breed: '金毛寻回犬',
    age: '2 岁',
    gender: '公',
    location: '旧金山, 加州',
    distance: '4 公里',
    fee: '¥1,050',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb2hOZX2Tv02DG61_ofP4eLMbXvmPJNlq_TH3-RQgF3vUtXfP9faEaPAzqVK4coe-3n0fEK5txiWPiysT24ZbNAfRe5SpGomVr0VNjAZf1xtrBqp5YmwqpRJ9L6M5KOahrTz4xPEZSf0GSKNby7XUqAKplGMSYvJsxNhpS3jnk2GIdx5LIjt3zZOsJ8ZtWuGC17mrCHua-R6ze0qP41ifx2H9tX7UB5xVmdC-_46hQnN2mqbs2Rask1Bdt1QT1zbLI7ZYjgp0v1v4',
    type: 'dog',
    tags: ['已接种疫苗', '对小孩友好', '已绝育', '已训练定点排泄'],
    description: 'Buddy 就像一束阳光，正在寻找他永远的家。他非常喜欢玩捡球游戏，对小朋友特别温柔，而且是个拥抱高手。\n\n他从之前的环境中获救，因为当时没有得到足够的运动，所以现在特别向往户外探险。如果您喜欢在沙滩漫步或徒步旅行，Buddy 将是您的完美伴侣！',
    shelter: {
      name: '爪爪庇护所',
      address: '认证机构 • 距离 4 公里',
      distance: '4 公里',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ_x9giHeNmzaIsySx8UiqigZ_KkQJAtWDTYh50lOD6qPCLXwAqP_uU074acn7mskgSlB8qd2ia8Rof11IcmKvdV0mNgYB4l9Q6GcWtFaZ6L4XanMBMw5UXSYTuBzQIRrQKprG98LYa3cIt7HGmRemviTYS7bamDFkvDIalRxuFG_QMt1GwFF_62E5NUtr8x3KBdpB3W6xG52gYfTm4HZ5kt3NCWNs5mBEyOZK57scUrSlcSEMq4MZnuO5Sts5-hkfOl6pDObM0UM'
    }
  },
  {
    id: 'misty',
    name: 'Misty',
    breed: '英国短毛猫串串',
    age: '2 岁',
    gender: '雌性',
    location: '伦敦',
    distance: '3.7 公里',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbwf0h0AK4vtov7Q8jkyD_yJPsSAal8W3BoQnVA7RUakcJlOCxo_L10SjXJ2SdxJRtUwYS7ObT0x65Dd6NrGN7F9av-PbmsD9tNS0qs_duqQQlo5gMZwIc4LTa4FJQ2gJ8hgWjZu06ktuY2ic8Wg_Rt2CqTz72voOTcwhO4bwmPyXAIvdwccW75KKJLkfPixISTbIV3U_AtJnXTTdwsN6KawUhcNtmw7J_vS2X5-gJU_G17FBR3Y-I1QD2AIqH3rIb36fLKvSt6qk',
    type: 'cat',
    tags: ['安静', '独立', '粘人', '与其他猫咪友好'],
    description: 'Misty 是一个温柔的灵魂，正在寻找一个安静的家，让她可以尽情绽放。虽然她享受独立，但晚上也特别喜欢被挠下巴。她已经学会使用猫砂盆，并且非常爱干净。',
    videoUrl: '#',
    medical: {
      vaccination: '最新',
      neutered: true,
      specialNeeds: '无'
    },
    shelter: {
      name: '快乐爪爪收容所',
      address: '伦敦市爱心路 123 号',
      distance: '3.7 公里',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_eqrgsPvuGWv5HbHP05hGDpAbE5RcXhJkewDF1zldICUxatYdsCIzY5gMz4OGDMNmZPa5HuZyvofiukgY0HiS8XyBN2QeEBG1fu9oO7losEeeA3A29PwFJXRQJGNoo7eO2SnVV4d-RU3KLY0qsCmgoTdaE_w5CpD2X6CsuUxx8B0YstJhVgPUzSLabeB9FDngOWC1i40yQtI_bNbxJDGXHeIbCvYVqz-wU8bj3z0hwtrADolY7bgtPtQhM5a5qysP2xazCBkIIy8'
    }
  },
  {
    id: 'charlie',
    name: 'Charlie',
    breed: 'Golden Retr.',
    age: '2 岁',
    gender: '公',
    location: 'New York, USA',
    distance: '2.5km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKs0UxdgsaX1WsbVfGKfcTQ3nT2JcEjLYN-teSWZa7zBCh_qqxFpzAGih_guOr0Wgg1KAOSQHdijWI8wyWGQXHvFXRzGOym5yyEoZ8dcV6H_GoNlqDJrGLiPE2euteW4oTGBDqJo-QBoyZ7mpLYfQ484HrzGAbQGTNmBcR4UHC3Cn4W2pSzQsv9iG7k_ysmUjruomnGhpUGK6cQGqCbm6VRIN-s-es762H3Kz-OD-g2-5pwiIvZDlE-KkgRKSmZY63ImLdGlbtPzg',
    type: 'dog',
    tags: [],
    description: '',
    shelter: { name: '', address: '', distance: '', logo: '' }
  },
  {
    id: 'luna',
    name: 'Luna',
    breed: 'Persian',
    age: '1 岁',
    gender: '母',
    location: 'New York, USA',
    distance: '1.2km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCdesyyXf4XYcvvLxSwHwOicRqoNSQoOcvjaR1iRgJF8wdazrUGZPwsFpzhodLxw1OssM0o0PdezNOd5igkpz5T8trt5Pt0sB8ZSfXepaBB32sWY3HLDOenAO2U1NtdVMGR6LQalHKTcGsAJBjA86a5rXK9QAg_nXE_G32crzt3b_SQ9HXdTd5BEdmzRCSFjUMZwXb405fE6NVptR1KfprGc_MW2h67hyhNgvpFWITDaxiO66vRX6Vc830yPkx1vfiNWRDsrYDx5w',
    type: 'cat',
    tags: [],
    description: '',
    shelter: { name: '', address: '', distance: '', logo: '' }
  },
  {
    id: 'cooper',
    name: 'Cooper',
    breed: 'Terrier Mix',
    age: '4 个月',
    gender: '公',
    location: 'New York, USA',
    distance: '4.0km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwpbJ3wmSHbnWPg1tRrsfbxeyGzZAd5re-OdMRfTNKG-Cr2Vqk8gZDTuQfCQCBqbuXA_hXTl07HFA19yTijWDxGSYya-F0qkiJIHt-HCTJcIBZcor5G-JVllqUkTS90YyLGFc-Y1zpg3qYw-LEIikScMKKIsFrxIYn6EeqNP6s62cVur_J6aq38PIJfJG_o_OysoHKvdzMiH3JtzjJcLvfjuJhaqljY8tk9fHwOPICK16veAm5G_v5P8a7hRqwJzwx3tenOLiVjrg',
    type: 'dog',
    tags: [],
    description: '',
    shelter: { name: '', address: '', distance: '', logo: '' }
  },
  {
    id: 'bella',
    name: 'Bella',
    breed: 'Angora',
    age: '6 个月',
    gender: '母',
    location: 'New York, USA',
    distance: '0.8km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFbnislr9UQg0qZzKnQN-7V15ajq-z9zfQF7Yf3diMpc_aAEnf9boT6xVkrdQfwCyYw_xUEwcayYNag9LYNjWxf96V3qgcxOcA74GuQZQlXowjtyYi2KKhhy-OUKn5GHpKZbNWHUokQR0v6QQr4zFuI3_LK3pYpy6qVkOUu6nOrrIwtR6xsNPQSw-3bGq96FRzqBU_-CjvgTmikaR63jSorYxJdRCBzXW4_ZOIMg9UhrxzUyyrIKRuHFJZf8Z5QcaxjcNAM-zBHLo',
    type: 'rabbit',
    tags: [],
    description: '',
    shelter: { name: '', address: '', distance: '', logo: '' }
  }
];
