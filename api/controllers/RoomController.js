/**
 * RoomController
 *
 * @description :: Server-side logic for managing Rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* global sails */

module.exports = {
  'join': function (req, res) {
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.')
    }

    if (!req.param('roomId')) {
      return res.badRequest('`roomId` is required.')
    }

    sails.sockets.join(req, req.param('roomId'), function (err) {
      if (err) {
        return res.serverError(err)
      }

      res.json({
        room: req.param('roomId'),
        messages: 'You have joined the room!'
      })
    })
  }
}

