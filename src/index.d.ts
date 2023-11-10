import {GameService} from './app/game.service.ts';

// this is variable scope declaration
declare global {
    // the interface we are exposing a Class from
    interface Window {
        // the class we are exposing and it's type?
        GameService: GameService

        //note: don't forget to import the class from it's source file
    }
}