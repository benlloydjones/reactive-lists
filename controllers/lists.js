const List = require('../models/list');

function listsIndex(req, res, next) {
  List
    .find()
    .populate('owner')
    .exec()
    .then(lists => res.json(lists))
    .catch(next);
}

function listsShow(req, res, next) {
  List
    .findById(req.params.id)
    .populate('owner')
    .exec()
    .then(list => res.json(list))
    .catch(next);
}

function listsCreate(req, res, next) {
  List
    .create(req.body)
    .then(list => res.status(201).json(list))
    .catch(next);
}

function listsDelete(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then(food => food.remove())
    .then(() => res.status(204).end())
    .catch(next);
}

function listsUpdate(req, res, next) {
  List
    .findById(req.params.id)
    .populate('owner')
    .exec()
    .then(list => {
      list = Object.assign(list, req.body);
      return list.save();
    })
    .then(list => res.json(list))
    .catch(next);
}

function listsItemsCreate(req, res, next) {
  List
    .findById(req.params.id)
    .populate('owner')
    .exec()
    .then(list => {
      list.items.push(req.body);
      return list.save();
    })
    .then(list => {
      return res.status(200).json(list);
    })
    .catch(next);
}

function listsItemsDelete(req, res, next) {
  List
    .findById(req.params.id)
    .populate('owner')
    .exec()
    .then(list => {
      const item = list.items.id(req.params.itemId);
      item.remove();
      return list.save();
    })
    .then(list => res.json(list))
    .catch(next);
}

function listsItemsUpdate(req, res, next) {
  List
    .findById(req.params.id)
    .populate('owner')
    .exec()
    .then(list => {
      list.items = list.items.map(item => {
        if(item.id === req.params.itemId) {
          item = Object.assign(item, req.body);
          return item;
        } else {
          return item;
        }
      });
      return list.save();
    })
    .then(list => res.json(list))
    .catch(next);
}

module.exports = {
  index: listsIndex,
  show: listsShow,
  create: listsCreate,
  delete: listsDelete,
  update: listsUpdate,
  itemsCreate: listsItemsCreate,
  itemsDelete: listsItemsDelete,
  itemsUpdate: listsItemsUpdate
};
