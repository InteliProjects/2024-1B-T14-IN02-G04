module.exports.models = {
  schema: true,
  migrate: 'alter',

  attributes: {
    createdAt: { type: 'number', autoCreatedAt: true, },
    updatedAt: { type: 'number', autoUpdatedAt: true, },

    //id: { type: 'number', autoIncrement: true, },
  },

  dataEncryptionKeys: {
    default: 'tqMhP2Y8vdK85W+eY3W0MhZcALu4eu0MBhVtaik+SBQ='
  },

  cascadeOnDestroy: true

};
