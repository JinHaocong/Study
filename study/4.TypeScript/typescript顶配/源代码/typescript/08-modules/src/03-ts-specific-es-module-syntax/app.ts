import type {Dog1} from './animal'
import {type Cat, createCatName, type Dog} from './animal'

type Animals = Cat | Dog | Dog1

createCatName()
