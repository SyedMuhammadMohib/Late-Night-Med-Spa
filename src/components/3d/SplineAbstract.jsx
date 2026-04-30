import Spline from '@splinetool/react-spline';

export default function SplineAbstract() {
  return (
    <div style={{
      position: 'absolute',
      right: '-10%',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '600px',
      height: '600px',
      zIndex: 0,
      pointerEvents: 'auto', // Allow interaction with the 3D object
      opacity: 0.8
    }}>
      <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
    </div>
  );
}
