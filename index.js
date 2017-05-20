#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");


/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */
 
const _ = require('lodown-cainwatson');

const getMales = () => {
  let males = 0;
  _.each(customers, (e, i, a) => {
      if(e.gender === 'male') {
          males++;
      }
  });
  return males;
};
const getFemales = () => {
  let females = 0;
  _.each(customers, (e, i, a) => {
      if(e.gender === 'female') {
          females++;
      }
  });
  return females;
};
const getOldest = () => {
  let oldest = {age:-1};
  _.each(customers, (e, i, a) => {
      if(oldest.age < e.age) {
          oldest = e;
      }
  });
  return oldest;
};
const getYoungest = () => {
  let youngest = {age:1000};
  _.each(customers, (e, i, a) => {
      if(youngest.age > e.age) {
          youngest = e;
      }
  });
  return youngest;
}; 
const getAvgBalance = () => {
    let sum = 0;
    _.each(customers, (e, i, a) => {
        let curBal = e.balance;
        curBal = curBal.split('$').join('').split(',').join('');
        sum += Number(curBal);
    });
    return (sum.toFixed(2)/customers.length).toFixed(2);
};
const findByFirstLetterOfName = (letter) => {
    let amountWithLetter = 0;
    _.each(customers, (e, i, a) => {
       if(e.name.split('')[0] === letter) {
           amountWithLetter++;
       } 
    });
    return amountWithLetter;
};
const findFriendsByFirstLetterOfName = (customer, letter) => {
    let amountWithLetter = 0;
    _.each(customer.friends, (e, i, a) => {
       if(e.name.split('')[0] === letter) {
           amountWithLetter++;
       } 
    });
    return amountWithLetter;
};
const friendsWith = (customer) => {
    let friends = [];
    _.each(customers, (e, i, a) => {
        _.each(e.friends, (ee, ii, aa) => {
           if(ee.name === customer) {
               friends.push(e.name);
           } 
        });
    });
    return friends;
};
const mostCommonTags = () => {
    
    let tags = [];
    let count = [];
    _.each(customers, function(el) {
        _.each(el.tags, function(tag, index) {
            let found = _.indexOf(tags, tag);
            if(found === -1) {
                tags.push(tag);
                count.push(1);
            } else {
                count[found]++;
            }
            
        });
    });
    
    let tagsAndCount = {};
    _.each(count, function(curEle, curIndex) {
       tagsAndCount[tags[curIndex]] = curEle;
    });
    
    function getHighest(ob) {
        let max = -1;
        _.each(ob, function(el) {
           if(el > max) {
               max = el;
           }
        });
        return max;
    }
    
    let keys = Object.keys(tagsAndCount);
    for(let i = 0; i < keys.length; i++) {
      if(tagsAndCount[keys[i]] < getHighest(tagsAndCount)) {
          delete tagsAndCount[keys[i]]
      }  
    }
    keys = Object.keys(tagsAndCount);
    while(keys.length !== 3 || keys.length < 3) {
        delete tagsAndCount[keys[0]];
        keys = Object.keys(tagsAndCount);
    }
    
    return tagsAndCount;
    
};
const genderSummary = () => {
    let genders = _.reduce(customers, (prevSum, curVal, curIndex) => {
        let gens = prevSum;
        if(curVal.gender === 'transgender') {
            gens.transgender++;
        } else 
        if(curVal.gender === 'female') {
            gens.female++;
        } else 
        if(curVal.gender === 'male') {
            gens.male++;
        }
        return gens;
    }, {transgender: 0, female: 0, male: 0});
    
    return genders;
};

console.log(`
     Males:   ${getMales()}
     Females: ${getFemales()}
     
     Oldest:
        name: ${getOldest().name}
        age: ${getOldest().age}
     
     Youngest:
        name: ${getYoungest().name}
        age: ${getYoungest().age}
        
     Average Balance: $${getAvgBalance()}
     
     all with 'A': ${findByFirstLetterOfName('A')}
     all with 'O': ${findByFirstLetterOfName('O')}
     
     all friends of 'customer[0]' with 'A': ${findFriendsByFirstLetterOfName(customers[0], 'A')}
     all friends of 'customer[1]' with 'O': ${findFriendsByFirstLetterOfName(customers[1], 'O')}
     
     friends with customers[1]: 
        [
            ${friendsWith(customers[1].name).join(',\n\t\t')}
        ]
     
     top 3 tags: ${JSON.stringify(mostCommonTags(), null, '\t')}
     
     gender summary: ${JSON.stringify(genderSummary(), null, '\t')}`
);
//${JSON.stringify(mostCommonTags(), null, '\t')}
