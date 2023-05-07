const duplicatedString1 = 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg';
const duplicatedString2 = 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg';

// Pesquisa por "moscow"
export const drinkByNameMock = {
  drinks: [
    {
      idDrink: '11009',
      strDrink: 'Moscow Mule',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg',
    },
  ],
};

// Pesquisa por "gin"
export const drinkByIngredientMock = {
  drinks: [
    {
      strDrink: '3-Mile Long Island Iced Tea',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg',
      idDrink: '15300',
    },
    {
      strDrink: '69 Special',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vqyxqx1472669095.jpg',
      idDrink: '13940',
    },
    {
      strDrink: 'A1',
      strDrinkThumb: duplicatedString1,
      idDrink: '17222',
    },
    {
      strDrink: 'Abbey Cocktail',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/mr30ob1582479875.jpg',
      idDrink: '17834',
    },
    {
      strDrink: 'Abbey Martini',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2mcozt1504817403.jpg',
      idDrink: '17223',
    },
    {
      strDrink: 'Ace',
      strDrinkThumb: duplicatedString2,
      idDrink: '17225',
    },
    {
      strDrink: 'Adam & Eve',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vfeumw1504819077.jpg',
      idDrink: '17226',
    },
    {
      strDrink: 'Addison',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/yzva7x1504820300.jpg',
      idDrink: '17228',
    },
    {
      strDrink: 'Alaska Cocktail',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/wsyryt1483387720.jpg',
      idDrink: '11013',
    },
    {
      strDrink: 'Alexander',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/0clus51606772388.jpg',
      idDrink: '11014',
    },
    {
      strDrink: 'Allies Cocktail',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/qvprvp1483388104.jpg',
      idDrink: '11022',
    },
    {
      strDrink: 'Angel Face',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vaukir1606772580.jpg',
      idDrink: '11034',
    },
    {
      strDrink: 'Archbishop',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/4g6xds1582579703.jpg',
      idDrink: '11052',
    },
    {
      strDrink: 'Army special',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/55muhh1493068062.jpg',
      idDrink: '17066',
    },
    {
      strDrink: 'Arthur Tompkins',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/7onfhz1493067921.jpg',
      idDrink: '11054',
    },
  ],
};

// Pesquisa por "a"
export const drinkByFirstLetterMock = {
  drinks: [
    {
      idDrink: '17222',
      strDrink: 'A1',
      strDrinkThumb: duplicatedString1,
    },
    {
      idDrink: '13501',
      strDrink: 'ABC',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
    },
  ],
};

export const invalidDrinkMock = {
  drinks: null,
};

export const allDrinksLoadingPageMock = {
  drinks: [
    {
      idDrink: '15997',
      strDrink: 'GG',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      idDrink: '17222',
      strDrink: 'A1',
      strDrinkThumb: duplicatedString1,
    },
    {
      idDrink: '13501',
      strDrink: 'ABC',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
    },
    {
      idDrink: '17203',
      strDrink: 'Kir',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
    },
    {
      idDrink: '14229',
      strDrink: '747',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg',
    },
    {
      idDrink: '15288',
      strDrink: '252',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg',
    },
    {
      idDrink: '17225',
      strDrink: 'Ace',
      strDrinkThumb: duplicatedString2,
    },
    {
      idDrink: '17837',
      strDrink: 'Adam',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg',
    },
    {
      idDrink: '13332',
      strDrink: 'B-53',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rwqxrv1461866023.jpg',
    },
    {
      idDrink: '13938',
      strDrink: 'AT&T',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg',
    },
    {
      idDrink: '14610',
      strDrink: 'ACID',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg',
    },
    {
      idDrink: '15853',
      strDrink: 'B-52',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5a3vg61504372070.jpg',
    },
    {
      idDrink: '16262',
      strDrink: 'H.D.',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/upusyu1472667977.jpg',
    },
  ],
};

// usado com Cocktail
export const drinkByCocktailCategoryMock = {
  drinks: [
    {
      strDrink: '155 Belmont',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg',
      idDrink: '15346',
    },
    {
      strDrink: '57 Chevy with a White License Plate',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg',
      idDrink: '14029',
    },
    {
      strDrink: '747 Drink',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/i9suxb1582474926.jpg',
      idDrink: '178318',
    },
    {
      strDrink: '9 1/2 Weeks',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xvwusr1472669302.jpg',
      idDrink: '16108',
    },
    {
      strDrink: 'A Gilligan\'s Island',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/wysqut1461867176.jpg',
      idDrink: '16943',
    },
    {
      strDrink: 'A True Amaretto Sour',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rptuxy1472669372.jpg',
      idDrink: '17005',
    },
    {
      strDrink: 'A.D.M. (After Dinner Mint)',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/ruxuvp1472669600.jpg',
      idDrink: '14560',
    },
    {
      strDrink: 'A1',
      strDrinkThumb: duplicatedString1,
      idDrink: '17222',
    },
    {
      strDrink: 'Abbey Martini',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2mcozt1504817403.jpg',
      idDrink: '17223',
    },
    {
      strDrink: 'Absolut Summertime',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/trpxxs1472669662.jpg',
      idDrink: '14107',
    },
    {
      strDrink: 'Absolutely Fabulous',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/abcpwr1504817734.jpg',
      idDrink: '17224',
    },
    {
      strDrink: 'Absolutly Screwed Up',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/yvxrwv1472669728.jpg',
      idDrink: '16134',
    },
    {
      strDrink: 'Ace',
      strDrinkThumb: duplicatedString2,
      idDrink: '17225',
    },
    {
      strDrink: 'Adam & Eve',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vfeumw1504819077.jpg',
      idDrink: '17226',
    },
    {
      strDrink: 'Addington',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/ib0b7g1504818925.jpg',
      idDrink: '17227',
    },
  ],
};

export const drinksCategoriesMock = {
  drinks: [
    {
      strCategory: 'Ordinary Drink',
    },
    {
      strCategory: 'Cocktail',
    },
    {
      strCategory: 'Shake',
    },
    {
      strCategory: 'Other / Unknown',
    },
    {
      strCategory: 'Cocoa',
    },
    {
      strCategory: 'Shot',
    },
  ],
};
