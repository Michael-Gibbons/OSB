import {
  Card,
  Layout,
  Loading,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
} from "@shopify/polaris";

export function AppNavigationLoading() {
  return (
    <>
      <div style={{ width: "239px", padding: "1.2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText lines={9} />
          </TextContainer>
        </div>
        <div>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText lines={9} />
          </TextContainer>
        </div>
      </div>
    </>
  );
}
