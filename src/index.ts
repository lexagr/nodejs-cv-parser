import { interval, Observable, Observer, of } from "rxjs";

class ArrayObserver implements Observer<any> {
  next(value: any) {
    console.log("next: ", value);
  }

  error(err: any) {
    console.log("error: ", err);
  }

  complete() {
    console.log("observer end");
  }
}

of(0, 5, 8, 2913, 4).subscribe(new ArrayObserver());
of(0, 5, 8, 2913, 4).subscribe((val) => console.log(val));

console.log("rxjs of", 0);
