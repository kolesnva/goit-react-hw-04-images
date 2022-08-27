import { BallTriangle } from 'react-loader-spinner';

export function Loader() {
  return (
    <BallTriangle
      height={400}
      width={400}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle=""
      visible={true}
    />
  );
}
