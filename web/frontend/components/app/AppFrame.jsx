import AppErrorBoundary from './AppErrorBoundary';
import { Frame } from '@shopify/polaris';
import { OSBLogo, OSBLogoDark } from '../../assets';
import AppTopBar from './AppTopBar';
import AppNavigation from './AppNavigation';
import Routes from '../../Routes';
import useToggle from '../../hooks/util/useToggle';


import { AppContext } from '../../contexts/AppContext';

import useCreateToast from '../../hooks/app/util/useCreateToast';
import AppToast from './AppToast';

import useCreateModal from '../../hooks/app/util/useCreateModal';
import AppModal from './AppModal';

import useCreateBanner from '../../hooks/app/util/useCreateBanner';
import AppBanner from './AppBanner';

export default function AppFrame() {
  const [mobileNavigationActive, toggleMobileNavigationActive] = useToggle(false)

  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("../../pages/**/!(*.test.[jt]sx)*.([jt]sx)");

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
          {/* {contextualSaveBarMarkup}
          {loadingMarkup}
          {pageMarkup}
           */}
          <AppBanner banner={banner} />
          <AppModal modal={modal} />
          <AppToast toast={toast} />
          <Routes pages={pages} />
        </Frame>
      </AppContext.Provider>
    </AppErrorBoundary>
  )
}