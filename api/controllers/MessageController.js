/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* global sails */

module.exports = {
  'public': function (req, res) {
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.')
    }

    if (!req.param('roomId')) {
      return res.badRequest('`roomId` is required.')
    }

    if (!req.param('msg')) {
      return res.badRequest('`msg` is required.')
    }

    sails.sockets.broadcast(req.param('roomId'), {
      room: {
        id: req.param('roomId')
      },
      msg: req.param('msg')
    })
    return res.ok()
  }
}

