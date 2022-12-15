import AppErrorBoundary from './AppErrorBoundary';
import { Frame } from '@shopify/polaris';
import { OSBLogo, OSBLogoDark } from '../../assets';
import AppTopBar from './AppTopBar';
import AppNavigation from './AppNavigation';
import Routes from '../Routes';

import {useToggle, useCreateToast, useCreateModal, useCreateBanner, useCreateLoading, useCreateContextualSaveBar} from '../../hooks/index';

import AppContext from '../../contexts/AppContext';

// App Utilities

import AppToast from './AppToast';

import AppModal from './AppModal';

import AppBanner from './AppBanner';

import AppLoading from './AppLoading'

import AppContextualSaveBar from './AppContextualSaveBar';

export default function AppFrame() {
  const [mobileNavigationActive, toggleMobileNavigationActive] = useToggle(false)

  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("../pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  const logo = {
    width: 90,
    topBarSource: OSBLogo,
    contextualSaveBarSource: OSBLogoDark,
    url: '/',
    accessibilityLabel: 'OSB Logo',
  };

  const [toast, setToast] = useCreateToast()
  const [modal, setModal, toggleModal] = useCreateModal()
  const [banner, setBanner, toggleBanner] = useCreateBanner()
  const [loading, setLoading] = useCreateLoading()
  const [contextualSaveBar, setContextualSaveBar, setIsDirty] = useCreateContextualSaveBar()

  const contextValue = {
    toast: {
      setToast
    },
    modal: {
      setModal,
      toggleModal
    },
    banner: {
      setBanner,
      toggleBanner
    },
    loading: {
      setLoading
    },
    contextualSaveBar: {
      setContextualSaveBar,
      setIsDirty
    }
  }

  return (
    <AppErrorBoundary>
      <AppContext.Provider value={contextValue}>
        <Frame
            logo={logo}
            topBar={<AppTopBar toggleMobileNavigationActive={toggleMobileNavigationActive}/>}
            navigation={<AppNavigation />}
            showMobileNavigation={mobileNavigationActive}
            onNavigationDismiss={toggleMobileNavigationActive}
          >
            {/* App Utilities */}
            <AppContextualSaveBar contextualSaveBar={contextualSaveBar} />
            <AppLoading loading={loading} />
            <AppBanner banner={banner} />
            <AppModal modal={modal} />
            <AppToast toast={toast} />
            {/* App Utilities */}

            <Routes pages={pages} />
        </Frame>
      </AppContext.Provider>
    </AppErrorBoundary>
  )
}