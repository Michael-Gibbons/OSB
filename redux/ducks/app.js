// This duck is for all app scoped data required for operation but not related to any specific component
// ex: error messages, toasts, success messages, contextual save bar actions, modal content, etc

export const SET_LOADING = "SET_LOADING";
export const SET_TOAST = "SET_TOAST";
export const SET_MODAL = "SET_MODAL";
export const SET_CONTEXTUAL_SAVE_BAR = "SET_CONTEXTUAL_SAVE_BAR";
export const SET_NAVIGATION = "SET_NAVIGATION";
export const SET_BANNER = "SET_BANNER";

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

export const setToast = (toast) => ({
  type: SET_TOAST,
  toast,
});

export const setModal = (modal) => ({
  type: SET_MODAL,
  modal,
});

export const setContextualSaveBar = (contextualSaveBar) => ({
  type: SET_CONTEXTUAL_SAVE_BAR,
  contextualSaveBar,
});

export const setNavigation = (navigation) => ({
  type: SET_NAVIGATION,
  navigation,
});

export const setBanner = (banner) => ({
  type: SET_BANNER,
  banner,
});

const initialState = {
  loading: false,
  toast: {
    active: false,
    content: null,
    duration: 2000,
    error: false,
    onDismiss: null,
    action: {
      content: null,
      onAction: null,
    },
  },
  modal: {
    activator: null,
    children: null,
    footer: null,
    small: false,
    large: false,
    loading: false,
    open: false,
    title: null,
    titleHidden: null,
    onClose: null,
    onScrolledToBottom: null,
    primaryAction: {
      content: null,
      destructive: false,
      disabled: false,
      outline: false,
      plain: false,
      onAction: null,
      loading: false,
    },
    secondaryActions: [], // Properties same as primary action, just as an array
  },
  contextualSaveBar: {
    isDirty: false,
    saveAction: {
      onAction: null,
    },
    discardAction: {
      onAction: null,
    },
  },
  navigation: {
    mobileNavigationActive: false,
  },
  banner: {
    active: false,
    dismissable: true,
    title: null,
    onDismiss: null,
    action: {
      content: null,
      destructive: false,
      disabled: false,
      outline: false,
      plain: false,
      onAction: null,
      loading: false,
    },
    secondaryAction: {
      content: null,
      onAction: null,
    },
    status: null, // "success" | "info" | "warning" | "critical"
    children: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      const { loading } = action;
      return { ...state, loading };
    case SET_TOAST:
      const { toast } = action;
      return { ...state, toast: { ...initialState.toast, ...toast } };
    case SET_MODAL:
      const { modal } = action;
      return { ...state, modal: { ...initialState.modal, ...modal } };
    case SET_CONTEXTUAL_SAVE_BAR:
      const { contextualSaveBar } = action;
      return {
        ...state,
        contextualSaveBar: {
          ...initialState.contextualSaveBar,
          ...contextualSaveBar,
        },
      };
    case SET_NAVIGATION:
      const { navigation } = action;
      return {
        ...state,
        navigation: { ...initialState.navigation, ...navigation },
      };
    case SET_BANNER:
      const { banner } = action;
      return {
        ...state,
        banner: { ...initialState.banner, ...banner },
      };
    default:
      return state;
  }
};
