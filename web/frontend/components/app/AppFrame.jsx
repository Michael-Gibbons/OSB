import AppErrorBoundary from './AppErrorBoundary';
import { Frame } from '@shopify/polaris';
import { OSBLogo } from '../../assets';
import AppTopBar from './AppTopBar';
import Routes from '../../Routes';

export default function AppFrame() {

  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("../../pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  const logo = {
    width: 90,
    topBarSource: OSBLogo,
    contextualSaveBarSource: OSBLogo,
    url: '/',
    accessibilityLabel: 'OSB Logo',
  };

  return (
    <AppErrorBoundary>
        <Frame
          logo={logo}
          topBar={<AppTopBar/>}
          // navigation={navigationMarkup}
          // showMobileNavigation={mobileNavigationActive}
          // onNavigationDismiss={toggleMobileNavigationActive}
          // skipToContentTarget={skipToContentRef.current}
        >
          {/* {contextualSaveBarMarkup}
          {loadingMarkup}
          {pageMarkup}
          {toastMarkup}
          {modalMarkup} */}
          <Routes pages={pages} />
        </Frame>
    </AppErrorBoundary>
  )
}