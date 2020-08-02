import {Model, Type} from 'onecore';

export const articleModel: Model = {
  name: 'article',
  attributes: {
    articleId: {
      field: 'articleId',
      type: Type.String,
      key: true
    },
    name: {
      field: 'name',
      type: Type.String,
      length: 255,
      allowNull: true
    },
    description: {
      field: 'description',
      type: Type.String ,
      length: 255
    },
    body: {
      field: 'body',
      type: Type.String,
      length: 255
    },
    // keywords: {
    //   field: 'keywords',
    //   type: Type.Array,
    //   typeOf: Type.String
    // },
    status: {
      field: 'status',
      type: Type.Date
    }
  }
};
