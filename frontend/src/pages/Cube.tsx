// src/components/Cube3D.tsx
import './Cube.css'; // Custom styles for 3D cube

const industries = {
  front: { icon: '💼', label: 'Business', href: '/industries/finance-legal-ngos' },
  back: { icon: '🏥', label: 'Healthcare', href: '/industries/healthcare-wellness' },
  right: { icon: '🏭', label: 'Construction', href: '/industries/real-estate-construction' },
  left: { icon: '🏦', label: 'Finance', href: '/industries/finance-legal-ngos' },
  top: { icon: '🛒', label: 'Retail', href: '/industries/retail-commerce' },
  bottom: { icon: '🎓', label: 'Education', href: '/industries/education-learning' },
};

const Cube = () => {
  return (
    <div className="relative w-64 h-64 perspective">
      <div className="cube">
        {Object.entries(industries).map(([face, { icon, label, href }]) => (
          <a key={face} href={href} className={`cube-face ${face}`}>
            <span className="text-4xl">{icon}</span>
            <span className="mt-2 text-white font-semibold">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Cube;
