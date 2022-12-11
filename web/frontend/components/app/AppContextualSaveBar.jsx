import { ContextualSaveBar } from '@shopify/polaris'

export default function AppContextualSaveBar({ contextualSaveBar }){
  return contextualSaveBar.isDirty ? (
    <ContextualSaveBar
      alignContentFlush={contextualSaveBar.alignContentFlush || false}
      message={contextualSaveBar.message || ''}
      saveAction={contextualSaveBar.saveAction || null}
      discardAction={contextualSaveBar.discardAction || null}
      fullwidth={contextualSaveBar.fullwidth || false}
      contextControl={contextualSaveBar.contextControl || null}
      secondaryMenu={contextualSaveBar.secondaryMenu || null}
    />
  ): null
}