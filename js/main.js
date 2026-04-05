const app = new Vue({
  el: '#app',
  data: {
    products: [
      {
        id: 1,
        title: 'Капуста білокачанна',
        short_text: 'Свіжа біла капуста, соковита та хрустка. Ідеально підходить для салатів та борщу.',
        image: 'imgs/resized/cabbage1.jpg',
        desc: 'Білокачанна капуста — один із найпопулярніших овочів. Багата на вітамін C та клітковину. Відмінно підходить для квашення, тушкування та свіжих салатів. Вирощена без пестицидів на органічних полях.'
      },
      {
        id: 2,
        title: 'Капуста червонокачанна',
        short_text: 'Яскрава червона капуста з насиченим смаком. Прикраса будь-якого салату.',
        image: 'imgs/resized/cabbage2.jpg',
        desc: 'Червонокачанна капуста вирізняється яскравим кольором та антиоксидантами. Містить антоціани, які зміцнюють судини. Чудово поєднується з яблуком та морквою в свіжих салатах.'
      },
      {
        id: 3,
        title: 'Капуста броколі',
        short_text: 'Зелена броколі — суперфуд з безліччю корисних речовин.',
        image: 'imgs/resized/cabbage3.jpg',
        desc: 'Броколі — справжній чемпіон серед овочів за вмістом поживних речовин. Багата на залізо, кальцій та вітаміни групи B. Готується на парі, запікається або вживається у свіжому вигляді.'
      },
      {
        id: 4,
        title: 'Капуста цвітна',
        short_text: 'Ніжна цвітна капуста — делікатес для вишуканих страв.',
        image: 'imgs/resized/cabbage4.jpg',
        desc: 'Цвітна капуста відрізняється м\'яким смаком та ніжною текстурою. Ідеальна для запікання з сиром, супів-пюре та дієтичного харчування. Містить мало калорій і багато корисних мікроелементів.'
      },
      {
        id: 5,
        title: 'Капуста савойська',
        short_text: 'Кучерява савойська капуста з делікатним смаком і красивим виглядом.',
        image: 'imgs/resized/cabbage5.jpg',
        desc: 'Савойська капуста з її кучерявим листям має більш м\'який смак порівняно зі звичайною. Чудово підходить для голубців, рагу та гарнірів. Багата на білок та вітаміни групи K.'
      }
    ],
    product: [],
    btnVisible: 0,
    cart: [],
    contactFields: {
      name: '',
      companyName: '',
      position: '',
      city: '',
      country: '',
      telephone: '',
      email: '',
      youAre: 'seed_producer',
      otherSpecify: '',
      interest: '',
      captcha: ''
    },
    orderSubmitted: false,
    submittedData: {}
  },
  methods: {
    getProduct() {
      const hash = window.location.hash;
      if (hash) {
        const id = parseInt(hash.replace('#', ''));
        this.product = this.products.find(p => p.id === id) || [];
      }
    },
    addToCart(id) {
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      if (!cart[id]) {
        cart[id] = id;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      this.btnVisible = 1;
    },
    checkInCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      const hash = window.location.hash;
      if (hash) {
        const id = parseInt(hash.replace('#', ''));
        if (cart[id]) {
          this.btnVisible = 1;
        }
      }
    },
    getCart() {
      const stored = JSON.parse(localStorage.getItem('cart')) || {};
      const ids = Object.keys(stored).map(Number);
      this.cart = this.products.filter(p => ids.includes(p.id));
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(p => p.id !== id);
      const stored = JSON.parse(localStorage.getItem('cart')) || {};
      delete stored[id];
      localStorage.setItem('cart', JSON.stringify(stored));
    },
    makeOrder() {
      this.submittedData = Object.assign({}, this.contactFields);
      this.cart = [];
      localStorage.setItem('cart', JSON.stringify({}));
      this.orderSubmitted = true;
    }
  },
  mounted() {
    this.getProduct();
    this.checkInCart();
    this.getCart();
  }
});