import { Router } from 'express';
import Show from './show.model';

const router = new Router();

const create = (req, res) => {
  Show.create(req.body, (err, show) => {
    if (err) {
      return console.log(res, err);
    }
    return res.status(201).json(show);
  });
};

const getAll = (req, res) => {
  Show.find((err, shows) => {
    if (err) {
      return console.log(res, err);
    }
    return res.status(200).json(shows);
  });
};

const getSingle = (req, res) => {
  Show.findById(req.params.id, (err, thing) => {
    if (err) {
      return console.log(res, err);
    }
    if (!thing) {
      return res.status(404).send('Not Found');
    }
    return res.json(thing);
  });
};

const update = (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }

  Show.findById(req.params.id, (err, show) => {
    if (err) {
      return console.log(res, err);
    }
    if (!show) {
      return res.status(404).send('Not Found');
    }

    const updated = Object.assign(show, req.body);
    updated.save(err => {
      if (err) {
        console.log(res, err);
      }
      return res.status(200).json(show);
    });
  });
};

// Deletes a thing from the DB.
const destroy = (req, res) => {
  Show.findById(req.params.id, (err, show) => {
    if (err) {
      return console.log(res, err);
    }

    if (!show) {
      return res.status(404).send('Not Found');
    }

    show.remove(err => {
      if (err) {
        return console.log(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', create);
router.put('/:id', update);
router.patch('/:id', update);
router.delete('/:id', destroy);

export default router;
