const sequelize = require('../db.js');
const faker = require('faker');
const bcrypt = require('bcrypt');
const { resetDB } = require('./setup.js');
const User = require('../models/User.js');
const Item = require('../models/Item.js');
const Conversation = require('../models/Conversation.js');
const Message = require('../models/Message.js');
const Receipt = require('../models/Receipt.js');
const Claim = require('../models/Claim.js');


const seedUser = async () => {
  try {
    let users = [];
    for (let i = 0; i < 100; i++) {
      users[i] = {};
      users[i].userName = faker.internet.userName();
      users[i].email = faker.internet.email();
      users[i].photoUrl = faker.image.people();
      if (i % 10 === 0) {
        users[i].status = 'charity';
      } else {
        users[i].status = 'individual';
      }

      if (i < 40) {
        // NY
        users[i].latitude = 40.72557420158411;
        users[i].longitude = -74.01148541130824;
      } else if (i >= 40 && i < 70) {
        // SF
        users[i].latitude = 37.962882809573145;
        users[i].longitude = -122.57822275079111;
      } else {
        // SA
        users[i].latitude = 47.77658566128346;
        users[i].longitude = -122.41963026610908;
      }
      users[i].password = await bcrypt.hash('123', 8);
    }
    await User.bulkCreate(users);
  } catch (error) {
    console.log('error adding data for users', error);
  }
}

// New York: 40.72557420158411, -74.01148541130824
// San Francisco: 37.962882809573145, -122.57822275079111
// Seattle: 47.77658566128346, -122.41963026610908

let categories = [
  'Apparel',
  'Electronics',
  'Entertainment',
  'Garden and Outdoor',
  'Hobbies',
  'Home Goods',
  'Musical Instruments',
  'Office Supplies',
  'Pet Supplies',
  'Sporting Goods'
];

// this is to generate more cases of unclaimed than the other two status
let itemStatus = ['unclaimed', 'unclaimed', 'claimed', 'complete'];

let coordinates = {
  ny: {
    latitude: 40.72557420158411,
    longitude: -74.01148541130824
  },
  sf: {
    latitude: 37.962882809573145,
    longitude: -122.57822275079111
  },
  sa: {
    latitude: 47.77658566128346,
    longitude: -122.41963026610908
  }
};

let items = [];
const seedItem = async () => {
  // let items = [];
  try {
    for (var i = 0; i < 100; i++) {
      items[i] = {};
      items[i].name = faker.commerce.productName();
      items[i].description = faker.commerce.productDescription();
      items[i].imageUrl = faker.image.fashion();
      items[i].category = categories[Math.floor(Math.random() * 10)];
      items[i].status = itemStatus[Math.floor(Math.random() * 4)];

      if (i < 40) {
        // NY
        items[i].latitude = (coordinates.ny.latitude - 0.5 + Math.random()).toFixed(12);
        items[i].longitude = (coordinates.ny.longitude - 0.5 + Math.random()).toFixed(12);
        items[i].donorId = Math.floor(Math.random() * 40);
      } else if (i >= 40 & i < 70) {
        // SF
        items[i].latitude = (coordinates.sf.latitude - 0.5 + Math.random()).toFixed(12);
        items[i].longitude = (coordinates.sf.longitude - 0.5 + Math.random()).toFixed(12);
        items[i].donorId = 40 + Math.floor(Math.random() * 30);
      } else {
        // SA
        items[i].latitude = (coordinates.sa.latitude - 0.5 + Math.random()).toFixed(12);
        items[i].longitude = (coordinates.sa.longitude - 0.5 + Math.random()).toFixed(12);
        items[i].donorId = 70 + Math.floor(Math.random() * 30);
      }
    }
    await Item.bulkCreate(items);
  } catch (error) {
    console.log('error adding data for items', error);
  }
}

// <40 newYork
// 40 -> 69 sf
// >69 seattle

const seedConversation = async () => {
  try {
    let conversations = [];
    for (let i = 0; i < 30; i++) {
      ny = {};
      console.log('ny', ny.id)
      // User from 0 to 20
      ny.smallerId = Math.floor(Math.random() * 20);
      // User from 21 to 39 (So we don't accidently get a use messaging themselves)
      ny.largerId = Math.floor(Math.random() * (39 - 21 + 1) + 21);
      conversations.push(ny);
    }
    // await Conversation.bulkCreate(newYork);
    // let sf = [];
    for (let i = 0; i < 30; i++) {
      sf = {};
      console.log('sf', sf.id)
      // User from 0 to 20
      sf.smallerId = Math.floor(Math.random() * (55 - 40 + 1) + 40);
      // User from 21 to 39 (So we don't accidently get a use messaging themselves)
      sf.largerId = Math.floor(Math.random() * (60 - 56 + 1) + 56);
      conversations.push(sf);
    }
    // await Conversation.bulkCreate(sf);
    let seattle = [];
    for (let i = 0; i < 30; i++) {
      seattle = {};
      console.log('seattle', seattle.id)
      // User from 0 to 20
      seattle.smallerId = Math.floor(Math.random() * (85 - 70 + 1) + 70);
      // User from 21 to 39 (So we don't accidently get a use messaging themselves)
      seattle.largerId = Math.floor(Math.random() * (99 - 86 + 1) + 86);
      conversations.push(seattle);
    }
    // await Conversation.bulkCreate(seattle);
    await Conversation.bulkCreate(conversations);
  } catch (error) {
    console.log(error);
  }
}

const seedMessage = async () => {
  let messages = [];
  for (let i = 1; i < 91; i++) {
    let conversation = await Conversation.findByPk(i);
    // A random number from 1 to 20 that will determine how many messages this conversation has
    let messageCount = Math.floor(Math.random() * (20 - 1) + 1);
    // Variables that will allow us to toggle between donor and claimant for each message
    let sender = {true: 'smallerId', false: 'largerId'}
    let toggle = false
    for (let j = 0; j < messageCount; j++) {
      let message = {
        message: faker.lorem.sentence(),
        userId: conversation[sender[toggle]],
        conversationId: i
      }
      messages.push(message);
      toggle = !toggle;
    }
  }
  await Message.bulkCreate(messages);
}

const seedReceipt = () => {

}

const seedClaim = async () => {
  try {
    let claims = [];
    let index = 0;
    for (var i = 0; i < 100; i++) {
      if (items[i].status !== 'unclaimed') {
        claims[index] = {};
        claims[index].itemId = i;
        claims[index].status = items[i].status;

        // generate claimerId that belongs to the same area
        // created slightly different situations for the three areas so that we can testing different situations
        if (i < 40) {
          // for NY, all items claimed by userId = 1
          claims[index].claimerId = 1;
        } else if (i >= 40 && i < 70) {
          // for SF, items claimed by two users, with userId = 40 or 50
          if (i % 2 === 1) {
            claims[index].claimerId = 40
          } else {
            claims[index].claimerId = 50;
          }
        } else {
          // for SA, random userId within SA that is not the same as the donorId
          let donorId = items[i].donorId;
          let randomId = Math.floor(Math.random() * 30 + 70);
          while (randomId === donorId) {
            randomId = Math.floor(Math.random() * 30 + 70);
          }
          claims[index].claimerId = randomId;
        }
        index++;
      }
    }
    await Claim.bulkCreate(claims);
  } catch (error) {
    console.log('error adding data for claims', error);
  }
}


const seedAll = async() => {
  try {
    await resetDB();
    await User.sync({force: true});
    await Conversation.sync({force: true})
    await Item.sync({force: true});
    await Claim.sync({force: true});
    await Message.sync({force: true});
    await seedUser();
    await seedConversation();
    await seedItem();
    await seedClaim();
    await seedMessage();
  } catch (error) {
    console.log(error)
  }
}

seedAll();