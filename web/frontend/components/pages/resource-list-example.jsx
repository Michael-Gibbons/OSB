import {
  Page,
  Layout,
  TextField,
  Filters,
  Button,
  Card,
  ResourceList,
  Avatar,
  ResourceItem,
  TextStyle,
} from '@shopify/polaris';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { useBanner } from '../../hooks/index';

export default function ResourceListExample() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState('');
  const [setBanner] = useBanner()

  useEffect(() => {
    setBanner({
      active: true,
      title: 'Click on the customers to go to their individual page!'
    })

    return () => setBanner({ active: false }) // Turn banner off when unmounting component
  }, [])

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleQueryValueChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = [
    {
      id: 341,
      url: '/resource-list-example/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      latestOrderUrl: 'orders/1456',
    },
    {
      id: 256,
      url: '/resource-list-example/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      latestOrderUrl: 'orders/1457',
    },
  ];

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  const filters = [
    {
      key: 'taggedWith3',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
      {
        key: 'taggedWith3',
        label: disambiguateLabel('taggedWith3', taggedWith),
        onRemove: handleTaggedWithRemove,
      },
    ]
    : [];

  const filterControl = (
    <Filters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    >
      <div style={{ paddingLeft: '8px' }}>
        <Button onClick={() => console.log('New filter saved')}>Save</Button>
      </div>
    </Filters>
  );

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={items}
              renderItem={renderItem}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              promotedBulkActions={promotedBulkActions}
              bulkActions={bulkActions}
              sortValue={sortValue}
              sortOptions={[
                { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
                { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
              ]}
              onSortChange={(selected) => {
                setSortValue(selected);
                console.log(`Sort option changed to ${selected}.`);
              }}
              filterControl={filterControl}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

  function renderItem(item) {
    const { id, url, name, location, latestOrderUrl } = item;
    const media = <Avatar customer size="medium" name={name} />;
    const shortcutActions = latestOrderUrl
      ? [{ content: 'View latest order', url: latestOrderUrl }]
      : null;
    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
        shortcutActions={shortcutActions}
        persistActions
      >
        <TextStyle variation='strong'>
          {name} - Customer ID: {id}
        </TextStyle>
        <div>{location}</div>

      </ResourceItem>
    );
  }

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'taggedWith3':
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}