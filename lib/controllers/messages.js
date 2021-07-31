import { Router } from 'express';
import Message from '../models/message';

export default Router()
  .post('/api/v1/messages', (req, res, next) => {
    Message.insert(req.body)
      .then(message => res.send(message))
      .catch(next);
  })

  .get('/api/v1/messages', (req, res, next) => {
    Message.getAllRecent()
      .then(messages => res.send(messages))
      .catch(next);
  })

  .get('/api/v1/messages/:id', (req, res, next) => {
    Message.getById(req.params.id)
      .then(message => res.send(message))
      .catch(next);
  })

  .put('/api/v1/messages/:id', (req, res, next) => {

    Message.update(req.body, req.params.id)
      .then(message => res.send(message))
      .catch(next);
  })

  .delete('/api/v1/messages/:id', (req, res, next) => {
    Message.delete(req.params.id)
      .then(message => res.send(message))
      .catch(next);
  })
;




