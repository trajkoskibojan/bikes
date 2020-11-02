import * as actionTypes from './actionTypes';
import axios from 'axios-orders';

const dataStart = () => ({
  type: actionTypes.DATA_START,
});

const dataSuccess = (dataBicikle) => ({
  type: actionTypes.DATA_SUCCESS,
  bicikle: dataBicikle,
});

const dataFail = (error) => ({
  type: actionTypes.DATA_FAILD,
  error: error,
});

export const initData = () => {
  return (dispatch) => {
    dispatch(dataStart());
    axios('/products')
      .then((res) => {
        let data = [];
        if (res.data) {
          for (let i = 0; i < res.data.length; i++) {
            let star = Math.floor(Math.random() * 3 + 1);
            data.push({
              ...res.data[i],
              stars: star,
              id: i + 1,
              isAdded: false,
              isFavorite: false
            });
          }
          dispatch(dataSuccess(data));
        }
      })
      .catch((err) => {
        dispatch(dataFail(err));
      });
  };
};

export const onHighlightLink = (event) => ({
  type: actionTypes.HIGHLIGHT,
  event: event,
});

export const onCheckoutRedirect = () => ({
  type: actionTypes.CHECKOUT_REDIRECT,
});

export const onToggleFilters = (event) => ({
  type: actionTypes.TOGGLEFILTERS,
  event: event,
});

export const onToggleAll = () => ({
  type: actionTypes.TOGGLEALL,
});

export const onShow = () => ({
  type: actionTypes.ONSHOW,
});

export const onFilterPrice = () => ({
  type: actionTypes.FILTERPRICE,
});

export const onSearchHandler = (value) => ({
  type: actionTypes.SEARCHHANDLER,
  value: value,
});

export const onAddToCartHandler = (id) => ({
  type: actionTypes.ADDTOCART,
  id: id,
});

export const onAddToFavorities = (id) => ({
  type: actionTypes.ADDTOFAVORITIES,
  id: id,
});

export const onRemoveToFavorities = (id) => ({
  type: actionTypes.REMOVETOFAVORITIES,
  id: id,
});

export const onRemoveToCart = (id) => ({
  type: actionTypes.REMOVETOCART,
  id: id,
});

export const onCalcTotal = () => ({
  type: actionTypes.CALCTOTAL,
});

export const onMoveToWishlist = (id) => ({
  type: actionTypes.MOVETOWHISHLIST,
  id: id,
});

export const onMoveToCart = (id) => ({
  type: actionTypes.MOVETOCART,
  id: id,
});

export const onCompleteOrder = () => ({
  type: actionTypes.COMPLETEORDER,
});

export const onShowForm = () => ({
  type: actionTypes.SHOWFORM,
});

export const onHideForm = () => ({
  type: actionTypes.HIDEFORM,
});

export const onSetActiveHandler = (e) => ({
  type: actionTypes.ACTIVEHANDLER,
  event: e,
});

export const onInputChangeHandler = (e) => ({
  type: actionTypes.INPUTCHANGEHANDLER,
  e: e,
});
export const onPriceChangeHandler = (e) => ({
  type: actionTypes.PRICECHANGE,
  e: e,
});
