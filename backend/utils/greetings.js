// const QandE = data.map(d => {
//     return { category: 'Playstyle', message: d }
// });

// console.log(QandE);

const allMessages = [
    {
      category: 'Quests and Expeditions',
      message: 'Playing in low rank quests'
    },
    {
      category: 'Quests and Expeditions',
      message: 'Playing in high rank quests'
    },
    {
      category: 'Quests and Expeditions',
      message: 'Playing in master rank quests!'
    },
    { category: 'Quests and Expeditions', message: 'Investigations!' },
    { category: 'Quests and Expeditions', message: 'Events quests!' },
    { category: 'Quests and Expeditions', message: 'Arena quests' },
    { category: 'Quests and Expeditions', message: 'Time attack!' },
    { category: 'Quests and Expeditions', message: 'Clearing bounties!' },
    {
      category: 'Quests and Expeditions',
      message: 'Hunting tempered monstres!'
    },
    { category: 'Quests and Expeditions', message: '1-star quests' },
    { category: 'Quests and Expeditions', message: '2-star quests' },
    { category: 'Quests and Expeditions', message: '3-star quests' },
    { category: 'Quests and Expeditions', message: '4-star quests' },
    { category: 'Quests and Expeditions', message: '5-star quests' },
    { category: 'Quests and Expeditions', message: '6-star quests' },
    { category: 'Quests and Expeditions', message: '7-star quests' },
    { category: 'Quests and Expeditions', message: '8-star quests' },
    { category: 'Quests and Expeditions', message: '9-star quests' },
    { category: 'Quests and Expeditions', message: 'M1-star quests' },
    { category: 'Quests and Expeditions', message: 'M2-star quests' },
    { category: 'Quests and Expeditions', message: 'M3-star quests' },
    { category: 'Quests and Expeditions', message: 'M4-star quests' },
    { category: 'Quests and Expeditions', message: 'M5-star quests' },
    { category: 'Quests and Expeditions', message: 'M6-star quests' },
    { category: 'Locale', message: 'Ancient Forest' },
    { category: 'Locale', message: 'Wildspire Waste' },
    { category: 'Locale', message: 'Coral Highlands' },
    { category: 'Locale', message: 'Rotten Vale' },
    { category: 'Locale', message: "Elder's Recess" },
    { category: 'Locale', message: 'Hoarfrost Reach' },
    { category: 'Locale', message: 'The Guilding Lands' },
    {
        category: 'Weapons and Armor',
        message: 'Calling All Great Sword Users!'
      },
      {
        category: 'Weapons and Armor',
        message: 'Calling All Long Sword Users!'
      },
      {
        category: 'Weapons and Armor',
        message: 'Calling All Sword & Shield Users!'
      },
      {
        category: 'Weapons and Armor',
        message: 'Calling All Dual Blades Users!'
      },
      {
        category: 'Weapons and Armor',
        message: 'Calling All Hammer Users!'
      },
      {
        category: 'Weapons and Armor',
        message: 'Calling All Hunting Horn Users!'
      },
      {
        category: 'Weapons and Armor',
        message: 'Calling All Lance Users!'
      },
      {
        category: 'Weapons and Armor',
        message: 'Calling All Gunlance Users!'
      },
      {
        category: 'Weapons and Armor',
        message: 'Calling All Switch Axe Users!'
      },
      {
        category: 'Weapons and Armor',
        message: 'Calling All Charge Blade Users!'
      },
      {
        category: 'Weapons and Armor',
        message: 'Calling All Insect Glaive Users!'
      },
      {
        category: 'Weapons and Armor',
        message: 'Calling All Light Bowgun Users!'
      },
      {
        category: 'Weapons and Armor',
        message: 'Calling All Heavy Bowgun Users!'
      },
      { category: 'Weapons and Armor', message: 'Calling All Bow Users!' },
      { category: 'Weapons and Armor', message: 'Show Off Yor Gear' },
      { category: 'Weapons and Armor', message: 'Skill Set Connoisseurs' },
      { category: 'Weapons and Armor', message: 'Who needs armor!?' },
      { category: 'Rank', message: 'Any Hunter Rank' },
      { category: 'Rank', message: 'Hunter Rank 5 or higher' },
      { category: 'Rank', message: 'Hunter Rank 10 or higher' },
      { category: 'Rank', message: 'Hunter Rank 20 or higher' },
      { category: 'Rank', message: 'Hunter Rank 30 or higher' },
      { category: 'Rank', message: 'Hunter Rank 40 or higher' },
      { category: 'Rank', message: 'Hunter Rank 50 or higher' },
      { category: 'Rank', message: 'Hunter Rank 100 or higher' },
      { category: 'Rank', message: 'Hunter Rank 200 or higher' },
      { category: 'Rank', message: 'Hunter Rank 500 or higher' },
      { category: 'Rank', message: 'Any Master Rank' },
      { category: 'Rank', message: 'Master Rank 5 or higher' },
      { category: 'Rank', message: 'Master Rank 10 or higher' },
      { category: 'Rank', message: 'Master Rank 15 or higher' },
      { category: 'Rank', message: 'Master Rank 20 or higher' },
      { category: 'Rank', message: 'Master Rank 25 or higher' },
      { category: 'Rank', message: 'Master Rank 30 or higher' },
      { category: 'Rank', message: 'Master Rank 40 or higher' },
      { category: 'Rank', message: 'Master Rank 50 or higher' },
      { category: 'Rank', message: 'Master Rank 100 or higher' },
      { category: 'Playstyle', message: 'Anyone is welcome!' },
      { category: 'Playstyle', message: 'Chill hunting' },
      { category: 'Playstyle', message: 'No voice chat' },
      { category: 'Playstyle', message: 'Voice Chat On' },
      { category: 'Playstyle', message: 'Beginners are welcome!' },
      { category: 'Playstyle', message: 'Looking for experts!' },
      { category: 'Playstyle', message: 'One run only!' },
      { category: 'Playstyle', message: 'Strategists needed!' },
      { category: 'Playstyle', message: 'Looking for partners!' },
      { category: 'Playstyle', message: 'Will help with quests' },
      { category: 'Playstyle', message: 'Playing with friends' },
      { category: 'Playstyle', message: 'Looking for group members!' },
      { category: 'Playstyle', message: 'Fashion hunter time!' },
      { category: 'Playstyle', message: 'Zenny farming' },
      { category: 'Playstyle', message: 'Hunter rank farming' },
      { category: 'Playstyle', message: 'Master rank farming' },
      { category: 'Playstyle', message: 'Rare material farming' },
      { category: 'Playstyle', message: 'Focus on breaking monster parts' },
      { category: 'Playstyle', message: 'Focus on severing tails' },
      { category: 'Playstyle', message: 'Capturing monsters!' },
      { category: 'Playstyle', message: 'Searching for endemic life!' },
      { category: 'Playstyle', message: 'Lets hang out in my room!' }
  ]

module.exports = allMessages;
