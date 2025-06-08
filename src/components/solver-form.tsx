"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { solveProblem } from "@/lib/utils";

const categories = [
  { id: "math", label: "Math", active: true },
  { id: "physics", label: "Physics", active: false },
  { id: "chemistry", label: "Chemistry", active: false },
  { id: "programming", label: "Programming", active: false },
  { id: "general", label: "General", active: false },
];

const exampleProblems = {
  math: "Solve the quadratic equation x² + 5x + 6 = 0",
  physics: "Calculate the velocity of a falling object after 3 seconds",
  chemistry: "Balance the equation: H2 + O2 → H2O",
  programming: "Write a function to find the longest palindrome in a string",
  general: "Explain the concept of quantum computing",
};

export function SolverForm() {
  const [prompt, setPrompt] = useState("");
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("math");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Please enter a problem to solve");
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await solveProblem(prompt, activeCategory);
      setSolution(result);
      toast.success("Problem solved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to solve problem");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // You could optionally clear the input or provide a template based on category
  };

  const handleExampleClick = (problem: string) => {
    setPrompt(problem);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '1.5rem',
          border: '2px solid rgba(111, 76, 255, 0.5)',
          backgroundColor: 'rgba(27, 17, 64, 0.95)',
          padding: '2.5rem',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(111, 76, 255, 0.4)'
        }}
      >
        {/* Glowing accent */}
        <div style={{
          position: 'absolute',
          top: '-10rem',
          right: '-10rem',
          height: '20rem',
          width: '20rem',
          borderRadius: '100%',
          backgroundColor: '#5f3dc4',
          opacity: 0.2,
          filter: 'blur(60px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-10rem',
          left: '-10rem',
          height: '20rem',
          width: '20rem',
          borderRadius: '100%',
          backgroundColor: '#7048e8',
          opacity: 0.2,
          filter: 'blur(60px)'
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'white',
            textShadow: '0 2px 15px rgba(111, 76, 255, 0.6)',
            letterSpacing: '0.05em',
            background: 'linear-gradient(135deg, #ffffff 0%, #b3a4ff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            border: 'none'
          }}>AI Problem Solver</h1>
          
          {/* Category Selection */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2.5rem'
          }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                style={{
                  padding: '0.875rem 1.75rem',
                  borderRadius: '9999px',
                  color: 'white',
                  transition: 'all 0.3s',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  backgroundColor: activeCategory === category.id
                    ? 'rgba(26, 115, 232, 0.9)'
                    : 'rgba(53, 42, 82, 0.8)',
                  boxShadow: activeCategory === category.id
                    ? '0 6px 16px rgba(26, 115, 232, 0.4), 0 0 10px rgba(111, 76, 255, 0.4)'
                    : '0 4px 12px rgba(0, 0, 0, 0.2)',
                  border: activeCategory === category.id
                    ? '1px solid rgba(111, 76, 255, 0.6)'
                    : '1px solid rgba(111, 76, 255, 0.2)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (category.id !== activeCategory) {
                    e.currentTarget.style.backgroundColor = 'rgba(63, 52, 92, 0.9)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (category.id !== activeCategory) {
                    e.currentTarget.style.backgroundColor = 'rgba(53, 42, 82, 0.8)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {category.label}
                {activeCategory === category.id && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '30%',
                    height: '3px',
                    backgroundColor: '#ffffff',
                    borderRadius: '999px'
                  }}></div>
                )}
              </button>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <textarea
                placeholder={`Enter your ${activeCategory} problem here...`}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '12rem',
                  borderRadius: '0.75rem',
                  border: '2px solid rgba(111, 76, 255, 0.4)',
                  backgroundColor: 'rgba(43, 30, 87, 0.7)',
                  color: 'white',
                  padding: '1.25rem',
                  fontSize: '1.125rem',
                  outline: 'none',
                  boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  transition: 'all 0.3s ease'
                }}
                disabled={loading}
                onFocus={(e) => {
                  e.currentTarget.style.border = '2px solid rgba(111, 76, 255, 0.8)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.3), 0 0 10px rgba(111, 76, 255, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = '2px solid rgba(111, 76, 255, 0.4)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.3)';
                }}
              />
              {/* Glowing hint */}
              <div style={{
                position: 'absolute',
                bottom: '1.25rem',
                right: '1.25rem',
                fontSize: '0.85rem',
                color: 'rgba(179, 164, 255, 0.6)',
                fontStyle: 'italic'
              }}>
                Press Solve when ready
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  width: '100%',
                  maxWidth: '32rem',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #1a73e8 0%, #5e35b1 100%)',
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  boxShadow: '0 8px 20px rgba(26, 115, 232, 0.3), 0 0 10px rgba(94, 53, 177, 0.3)',
                  transition: 'all 0.3s',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 12px 24px rgba(26, 115, 232, 0.4), 0 0 15px rgba(94, 53, 177, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 8px 20px rgba(26, 115, 232, 0.3), 0 0 10px rgba(94, 53, 177, 0.3)';
                }}
              >
                {loading ? 'Solving...' : 'Solve Problem'}
                {!loading && <span style={{
                  position: 'absolute',
                  top: '50%',
                  right: '1.5rem',
                  transform: 'translateY(-50%)',
                  fontSize: '1.5rem'
                }}>→</span>}
              </button>
            </div>
          </form>
          
          {/* Example Problems */}
          <div style={{ 
            marginTop: '2.5rem', 
            backgroundColor: 'rgba(43, 30, 87, 0.4)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(111, 76, 255, 0.3)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '1rem',
              textAlign: 'center',
              textShadow: '0 2px 8px rgba(111, 76, 255, 0.4)'
            }}>Example Problems</h3>
            <ul style={{
              listStyleType: 'none',
              color: '#c1b3e8',
              margin: 0,
              padding: 0
            }}>
              <li style={{ 
                marginBottom: '0.75rem', 
                borderLeft: '3px solid rgba(111, 76, 255, 0.5)',
                paddingLeft: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem'
              }}>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#b3a4ff',
                  display: 'inline-block',
                  width: '6rem'
                }}>Math:</span>
                <button 
                  onClick={() => handleExampleClick(exampleProblems.math)}
                  style={{
                    color: '#e2d9f8',
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '0.25rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(111, 76, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {exampleProblems.math}
                </button>
              </li>
              <li style={{ 
                marginBottom: '0.75rem', 
                borderLeft: '3px solid rgba(111, 76, 255, 0.5)',
                paddingLeft: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem'
              }}>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#b3a4ff',
                  display: 'inline-block',
                  width: '6rem'
                }}>Physics:</span>
                <button 
                  onClick={() => handleExampleClick(exampleProblems.physics)}
                  style={{
                    color: '#e2d9f8',
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '0.25rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(111, 76, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {exampleProblems.physics}
                </button>
              </li>
              <li style={{ 
                marginBottom: '0.75rem', 
                borderLeft: '3px solid rgba(111, 76, 255, 0.5)',
                paddingLeft: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem'
              }}>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#b3a4ff',
                  display: 'inline-block',
                  width: '6rem'
                }}>Chemistry:</span>
                <button 
                  onClick={() => handleExampleClick(exampleProblems.chemistry)}
                  style={{
                    color: '#e2d9f8',
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '0.25rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(111, 76, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {exampleProblems.chemistry}
                </button>
              </li>
              <li style={{ 
                marginBottom: '0.75rem', 
                borderLeft: '3px solid rgba(111, 76, 255, 0.5)',
                paddingLeft: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem'
              }}>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#b3a4ff',
                  display: 'inline-block',
                  width: '6rem'
                }}>Programming:</span>
                <button 
                  onClick={() => handleExampleClick(exampleProblems.programming)}
                  style={{
                    color: '#e2d9f8',
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '0.25rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(111, 76, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {exampleProblems.programming}
                </button>
              </li>
              <li style={{ 
                marginBottom: '0.75rem', 
                borderLeft: '3px solid rgba(111, 76, 255, 0.5)',
                paddingLeft: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem'
              }}>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#b3a4ff',
                  display: 'inline-block',
                  width: '6rem'
                }}>General:</span>
                <button 
                  onClick={() => handleExampleClick(exampleProblems.general)}
                  style={{
                    color: '#e2d9f8',
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '0.25rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(111, 76, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {exampleProblems.general}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
      
      {solution && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginTop: '2rem' }}
        >
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '1.5rem',
            border: '2px solid rgba(111, 76, 255, 0.5)',
            backgroundColor: 'rgba(37, 26, 74, 0.95)',
            padding: '2rem',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(111, 76, 255, 0.4)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-10rem',
              left: '-10rem',
              height: '20rem',
              width: '20rem',
              borderRadius: '100%',
              backgroundColor: '#6f4cff',
              opacity: 0.15,
              filter: 'blur(60px)'
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '1.5rem',
                textAlign: 'center',
                textShadow: '0 2px 10px rgba(111, 76, 255, 0.5)'
              }}>Solution</h3>
              
              <div style={{
                whiteSpace: 'pre-wrap',
                color: '#ffffff',
                backgroundColor: 'rgba(43, 30, 87, 0.8)',
                padding: '1.75rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(111, 76, 255, 0.4)',
                lineHeight: '1.6',
                fontSize: '1.1rem',
                fontWeight: '500',
                boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)'
              }}>
                {solution}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 