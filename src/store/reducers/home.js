import * as actionTypes from 'store/actions/actionTypes';
import { updateObject, checkValidity } from '../../shared/utility';

const initialState = {
  bicikle: [],
  products: [],
  priceFilter: [],
  nameFilter: [],
  searched: [],
  cart: [],
  favorites: [],
  priceValue: '',
  priceValueEntered: '',
  priceHolder: 'smaller then ...',
  form: {
    firstname: { value: '', valid: false },
    lastname: { value: '', valid: false },
    email: { value: '', valid: false },
    password: {
      value: '',
      valid: false,
      isTouched: false,
      validation: {
        minLength: 6,
      },
    },
  },
  formIsValid: false,
  total: 0,
  error: null,
  coords: null,
  isCheckout: true,
  isMatched: true,
  show: true,
  showup: false,
  activeTab: true,
  loading: false,
};

export const onInputChangeHandler = (state, action) => {
  action.e.persist();
  const updatedControls = updateObject(state, {
    form: updateObject(state.form, {
      [action.e.target.name]: updateObject(state.form[action.e.target.name], {
        value: action.e.target.value,
        valid: checkValidity(
          action.e.target.value,
          state.form[action.e.target.name].validation
        ),
        isTouched: true,
      }),
    }),
  });

  let checkValidForm = true;

  for (let key in updatedControls.form) {
    const el = updatedControls.form[key];
    checkValidForm = el.valid && checkValidForm;
  }

  return updateObject(updatedControls, { formIsValid: checkValidForm });
};

const onDataStart = (state, action) => updateObject(state, { loading: true });

const onDataSuccess = (state, action) =>
  updateObject(state, { bicikle: action.bicikle, loading: false });

const onDataFaild = (state, action) =>
  updateObject(state, { error: action.error, loading: false });

const onShow = (state, action) => updateObject(state, { show: false });

export const onHighlightLink = (state, action) => {
  action.event.persist();
  const linkCoords = action.event.currentTarget.getBoundingClientRect();
  return updateObject(state, {
    coords: {
      width: linkCoords.width,
      height: linkCoords.height,
      top: linkCoords.top + window.scrollY,
      left: linkCoords.left + window.scrollX,
    },
    show: true,
  });
};

export const onCheckoutRedirect = (state, action) => {
  if (window.location.pathname === '/cart/checkout') {
    return updateObject(state, { isCheckout: false });
  }
  return updateObject(state, { isCheckout: true });
};

export const onFilterPrice = (state, action) => {
  const value = state.priceValue;

  let data = [];
  state.nameFilter.length > 0
    ? (data = state.nameFilter)
    : (data = state.bicikle);

  const updatePriceFilter = data.filter((product) => product.price < value);

  return updateObject(state, {
    products: updatePriceFilter,
    priceFilter: state.bicikle.filter((product) => product.price < value),
    isMatched:
      value <= 5990 ? false : true && !(updatePriceFilter.length === 0),
    priceValue: '',
  });
};

export const onToggleFilters = (state, action) => {
  action.event.persist();
  let currentFilterName = action.event.currentTarget.innerText.toUpperCase();
  let currentFilterType = action.event.currentTarget.dataset.type;

  let data = [];
  state.priceFilter.length > 0
    ? (data = state.priceFilter)
    : (data = state.bicikle);

  let updateFilterbyName = data.filter(
    (product) => product[currentFilterType] === currentFilterName
  );

  return updateObject(state, {
    products: updateFilterbyName,
    nameFilter: state.bicikle.filter(
      (product) => product[currentFilterType] === currentFilterName
    ),
    isMatched: !(updateFilterbyName.length === 0),
  });
};

export const onToggleAll = (state, action) => {
  return updateObject(state, {
    products: state.bicikle,
    priceFilter: [],
    nameFilter: [],
    priceValue: '',
    priceValueEntered: '',
    priceHolder: 'smaller then ...',
  });
};

export const onPriceChangeHandler = (state, action) => {
  action.e.persist();
  return updateObject(state, {
    priceValue: action.e.target.value,
    priceValueEntered: action.e.target.value,
    priceHolder: `smaller then $ ${action.e.target.value}`,
  });
};

export const onSearchHandler = (state, action) => {
  return updateObject(state, {
    searched: state.bicikle.filter((product) =>
      product.name.toLowerCase().includes(action.value.toLowerCase())
    ),
  });
};

export const onAddToCartHandler = (state, action) => {
  let addItemBicikle = state.bicikle.find(
    (product) => product.id === action.id
  );
  let updateAddItemBicikle = state.bicikle.map((product) =>
    product.id === action.id ? { ...product, isAdded: true } : product
  );
  addItemBicikle.isAdded = true;

  let updateAddItemProduct=[];
  if (state.products.length > 0) {
    let addItemProduct = state.products.find(
      (product) => product.id === action.id
    );
    updateAddItemProduct = state.products.map((product) =>
      product.id === action.id ? { ...product, isAdded: true } : product
    );
    addItemProduct.isAdded = true;
  }

  let updateFavItems;
  if (state.favorites.length > 0) {
    updateFavItems = state.favorites.map((product) =>
      product.id === action.id ? { ...product, isAdded: true } : product
    );
  } else {
    updateFavItems = [];
  }

  return updateObject(state, {
    cart: [...state.cart, addItemBicikle],
    favorites: updateFavItems,
    bicikle: updateAddItemBicikle,
    products: updateAddItemProduct,
  });
};

export const onRemoveToCart = (state, action) => {
  let removeItem = state.cart.filter((product) => product.id !== action.id);
  let updateRemoveItem = state.bicikle.map((product) =>
    product.id === action.id ? { ...product, isAdded: false } : product
  );

  let updateRemoveItemProduct = state.products.map((product) =>
    product.id === action.id ? { ...product, isAdded: false } : product
  );

  return updateObject(state, {
    cart: removeItem,
    bicikle: updateRemoveItem,
    products: updateRemoveItemProduct,
  });
};

export const onAddToFavorities = (state, action) => {
  let itemBike = state.bicikle.find((product) => product.id === action.id);
  let updateFavItem = state.bicikle.map((product) =>
    product.id === action.id ? { ...product, isFavorite: true } : product
  );
  itemBike.isFavorite = true;

  let updateFavItemProduct = [];
  if (state.products.length > 0) {
    let itemProduct = state.products.find(
      (product) => product.id === action.id
    );
    updateFavItemProduct = state.products.map((product) =>
      product.id === action.id ? { ...product, isFavorite: true } : product
    );
    itemProduct.isFavorite = true;
  }

  return updateObject(state, {
    favorites: [...state.favorites, itemBike],
    bicikle: updateFavItem,
    products: updateFavItemProduct,
  });
};

export const onRemoveToFavorities = (state, action) => {
  let items = state.favorites.filter((product) => product.id !== action.id);
  let updateFavItem = state.bicikle.map((product) =>
    product.id === action.id ? { ...product, isFavorite: false } : product
  );

  let updateFavItemProduct = state.products.map((product) =>
    product.id === action.id ? { ...product, isFavorite: false } : product
  );

  return updateObject(state, {
    favorites: items,
    bicikle: updateFavItem,
    products: updateFavItemProduct,
  });
};

export const onMoveToWishlist = (state, action) => {
  let item = state.cart.find((product) => product.id === action.id);
  let updateFavItem = state.bicikle.map((product) =>
    product.id === action.id ? { ...product, isFavorite: true } : product
  );

  let updateFavItemProduct = state.products.map((product) =>
    product.id === action.id ? { ...product, isFavorite: true } : product
  );
  item.isAdded = false;
  item.isFavorite = true;

  return updateObject(state, {
    favorites: [...state.favorites, item],
    bicikle: updateFavItem,
    products: updateFavItemProduct,
  });
};

export const onMoveToCart = (state, action) => {
  const itemAdd = state.favorites.find((product) => product.id === action.id);
  let updateAddItem = state.bicikle.map((product) =>
    product.id === action.id ? { ...product, isAdded: true } : product
  );

  let updateAddItemProduct = state.products.map((product) =>
    product.id === action.id ? { ...product, isAdded: true } : product
  );
  itemAdd.isFavorite = false;
  itemAdd.isAdded = true;

  return updateObject(state, {
    cart: [...state.cart, itemAdd],
    bicikle: updateAddItem,
    products: updateAddItemProduct,
  });
};

export const onCalcTotal = (state, action) => {
  const sumprice = state.cart.reduce((acc, cur) => {
    return acc + cur.price;
  }, 0);

  return updateObject(state, { total: sumprice });
};

export const onCompleteOrder = (state, action) => {
  return updateObject(state, { cart: [] });
};

export const onShowForm = (state, action) => {
  return updateObject(state, { showup: true });
};

export const onHideForm = (state, action) => {
  return updateObject(state, { showup: false });
};

export const onSetActiveHandler = (state, action) => {
  action.event.persist();
  const text = action.event.currentTarget.innerText;
  if (text === 'Sign Up') {
    return updateObject(state, { activeTab: true });
  }
  return updateObject(state, { activeTab: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DATA_START:
      return onDataStart(state, action);
    case actionTypes.DATA_SUCCESS:
      return onDataSuccess(state, action);
    case actionTypes.DATA_FAILD:
      return onDataFaild(state, action);
    case actionTypes.HIGHLIGHT:
      return onHighlightLink(state, action);
    case actionTypes.CHECKOUT_REDIRECT:
      return onCheckoutRedirect(state, action);
    case actionTypes.TOGGLEFILTERS:
      return onToggleFilters(state, action);
    case actionTypes.TOGGLEALL:
      return onToggleAll(state, action);
    case actionTypes.FILTERPRICE:
      return onFilterPrice(state, action);
    case actionTypes.SEARCHHANDLER:
      return onSearchHandler(state, action);
    case actionTypes.ONSHOW:
      return onShow(state, action);
    case actionTypes.ADDTOCART:
      return onAddToCartHandler(state, action);
    case actionTypes.ADDTOFAVORITIES:
      return onAddToFavorities(state, action);
    case actionTypes.REMOVETOFAVORITIES:
      return onRemoveToFavorities(state, action);
    case actionTypes.REMOVETOCART:
      return onRemoveToCart(state, action);
    case actionTypes.CALCTOTAL:
      return onCalcTotal(state, action);
    case actionTypes.MOVETOWHISHLIST:
      return onMoveToWishlist(state, action);
    case actionTypes.COMPLETEORDER:
      return onCompleteOrder(state, action);
    case actionTypes.MOVETOCART:
      return onMoveToCart(state, action);
    case actionTypes.SHOWFORM:
      return onShowForm(state, action);
    case actionTypes.HIDEFORM:
      return onHideForm(state, action);
    case actionTypes.ACTIVEHANDLER:
      return onSetActiveHandler(state, action);
    case actionTypes.INPUTCHANGEHANDLER:
      return onInputChangeHandler(state, action);
    case actionTypes.PRICECHANGE:
      return onPriceChangeHandler(state, action);
    default:
      return state;
  }
};

export default reducer;
