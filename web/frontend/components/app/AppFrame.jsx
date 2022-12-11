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

  const contextValue = {
    toast: {
      setToast
    },
    modal: {
      setModal,
      toggleModal
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
          <AppModal modal={modal}/>
          <AppToast toast={toast}/>
          <Routes pages={pages} />
        </Frame>
      </AppContext.Provider>
    </AppErrorBoundary>
  )
}