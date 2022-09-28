import React from 'react'

export default function validationPost(input) {

    let errors = {};

    if (!input.name) {
        errors.name = 'Name is required'
    }
    if (!input.description) {
        errors.description = 'Hey! make the description'
    }
    if (!input.released) {
        errors.released = "Hey! Don't forget the date"
    }
    if (input.rating > 5 || input.rating < 0) {
        errors.rating = 'Hey! The rating should be between 0 and 5'
    }


    return errors;
}
