
import { createClient } from 'contentful';
import marked from 'marked';

// let CLIENT_CACHE = null;

const createNewClient = () => {
  const client = createClient({
    space:       'o4irotzruet8',
    accessToken: 'b162fa3e196303db85b6f21ca47b754d76d21eecbeedf012e66ed1e866747fae',
  });
  // console.log(client);
  return client;
};

// const getContentTypes = async () => {
//   const client = createNewClient();
//   return client.getContentTypes();
// };

const formatContentField = (field) => {
  if (!field.content) { return field; }
  return {
    ...field,
    ...{
      content: marked(field.content),
    },
  };
};

const getContentFields = (items) => {
  const fields = items
    .map(item => item.fields)
    .map(formatContentField);
  return fields.length > 1 ? fields : fields[0];
};

const getContent = async (entryID) => {
  const client = createNewClient();
  const response = await client.getEntries({ content_type: entryID });
  const { items } = response;
  return getContentFields(items);
};

// const parseEntry = (entry) => {
//   // ...
// };

// const parseEntries = (entries) => {
//   // ...
// };

export const getEntries = async () => {
  const client = createNewClient();
  const response = await client.getEntries();
  // console.log(response);
  return response;
};

const getEntry = async (entryID) => {
  const client = createNewClient();
  const response = await client.getEntry(entryID);
  return response.fields;
};

export const getIntroPanelContent = async () => getEntry('6FRzKMOpiMecMGiugcuek0');
export const getPanelsContent = async () => getContent('panel');
export const getExpierienceContent = async () => getContent('panel');

// export const getAboutPanelContent = async () => {
//   // const contentTypes = await getContentTypes();
//   // console.log(contentTypes);
//   return getContent('aboutMe');
// };
