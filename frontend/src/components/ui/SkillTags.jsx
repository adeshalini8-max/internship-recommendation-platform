import { motion } from 'framer-motion';

const SkillTags = ({ skills = [], animated = true }) => {
  if (!skills || skills.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    }
  };

  // Wrapper element determines if we animate or render statically
  const Wrapper = animated ? motion.div : 'div';
  const TagWrapper = animated ? motion.span : 'span';

  return (
    <Wrapper 
      className="flex flex-wrap gap-2"
      variants={animated ? containerVariants : undefined}
      initial={animated ? "hidden" : undefined}
      animate={animated ? "show" : undefined}
    >
      {skills.map((skill, index) => (
        <TagWrapper
          key={`${skill}-${index}`}
          variants={animated ? tagVariants : undefined}
          className="px-3 py-1.5 text-xs font-medium rounded-lg glass-panel text-indigo-300 border-indigo-500/20 hover:border-indigo-400/50 hover:bg-indigo-500/10 transition-colors cursor-default"
        >
          {skill}
        </TagWrapper>
      ))}
    </Wrapper>
  );
};

export default SkillTags;