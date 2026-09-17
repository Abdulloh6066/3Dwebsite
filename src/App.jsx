import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, OrbitControls, SoftShadows } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef } from 'react'

function Cake() {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.18
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.035
  })

  return (
    <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.35}>
      <group ref={group} position={[0, -0.35, 0]}>
        <mesh position={[0, -1.15, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[2.05, 2.2, 0.18, 96]} />
          <meshStandardMaterial color="#d5b783" roughness={0.38} metalness={0.12} />
        </mesh>

        <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.65, 1.72, 1.25, 96]} />
          <meshStandardMaterial color="#f3dec2" roughness={0.72} />
        </mesh>

        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.28, 1.35, 0.92, 96]} />
          <meshStandardMaterial color="#fff4e8" roughness={0.62} />
        </mesh>

        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = (i / 8) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 1.12, 0.95, Math.sin(a) * 1.12]} rotation={[0.2, -a, 0.5]} castShadow>
              <sphereGeometry args={[0.18, 28, 28]} />
              <meshStandardMaterial color={i % 2 ? '#b53f62' : '#d66e86'} roughness={0.5} />
            </mesh>
          )
        })}

        <mesh position={[0, 1.08, 0]} castShadow>
          <torusGeometry args={[0.7, 0.055, 24, 100]} />
          <meshStandardMaterial color="#caaa70" metalness={0.55} roughness={0.27} />
        </mesh>

        <mesh position={[0, 1.12, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.78, 32]} />
          <meshStandardMaterial color="#d4af73" metalness={0.45} roughness={0.3} />
        </mesh>

        <mesh position={[0, 1.58, 0]} castShadow>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#fff4e6" roughness={0.4} />
        </mesh>
      </group>
    </Float>
  )
}

function Scene() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [4.8, 2.8, 6.2], fov: 38 }}>
      <color attach="background" args={['#efe4d1']} />
      <fog attach="fog" args={['#efe4d1', 8, 16]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 7, 4]} intensity={2.4} castShadow shadow-mapSize={[2048, 2048]} />
      <pointLight position={[-4, 2, 3]} intensity={1.4} color="#ffd9bd" />
      <SoftShadows size={18} samples={20} focus={0.5} />
      <Cake />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.27, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#ead9bd" roughness={0.9} />
      </mesh>
      <Environment preset="studio" />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.9} maxPolarAngle={1.6} autoRotate autoRotateSpeed={0.45} />
    </Canvas>
  )
}

const nav = ['Collections', 'Custom Cakes', 'About', 'Contact']

export default function App() {
  return (
    <main className="site-shell">
      <header className="nav">
        <a className="brand" href="#top" aria-label="Odina home">ODINA</a>
        <nav className="nav-links" aria-label="Main navigation">
          {nav.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>)}
        </nav>
        <a className="pill small" href="#order">Order cake</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
            Crafted in Tashkent · Since 2013
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, delay: .08 }}>
            Cakes that feel<br/><em>like a moment.</em>
          </motion.h1>
          <motion.p className="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .22 }}>
            Elegant celebration cakes, delicate desserts and custom designs made for the days you want to remember.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .3 }}>
            <a className="pill" href="#collections">Explore collection</a>
            <a className="text-link" href="#custom-cakes">Design your cake <span>↗</span></a>
          </motion.div>
          <div className="micro-row">
            <span>Fresh daily</span><i /> <span>Custom design</span><i /> <span>Premium ingredients</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Interactive 3D Odina cake">
          <Scene />
          <div className="drag-note"><span>↔</span> drag to rotate</div>
          <div className="floating-card">
            <span className="card-kicker">Signature</span>
            <strong>Odina Pearl</strong>
            <span>Vanilla · Raspberry · Cream</span>
          </div>
        </div>
      </section>

      <section className="statement" id="collections">
        <p>01 · THE ODINA COLLECTION</p>
        <h2>Made to be remembered<br/>before it is tasted.</h2>
      </section>

      <section className="cards">
        <article className="feature-card cream"><span>01</span><div><p>Signature cakes</p><h3>Soft forms.<br/>Bold details.</h3></div></article>
        <article className="feature-card cocoa"><span>02</span><div><p>Celebrations</p><h3>Your idea,<br/>made edible.</h3></div></article>
        <article className="feature-card rose"><span>03</span><div><p>Desserts</p><h3>Small pieces<br/>of occasion.</h3></div></article>
      </section>

      <section className="custom" id="custom-cakes">
        <p className="eyebrow">02 · CUSTOM DESIGN</p>
        <h2>Tell us the feeling.<br/>We’ll make the cake.</h2>
        <a className="pill" id="order" href="mailto:hello@odinatort.uz">Start an order</a>
      </section>

      <footer>
        <a className="brand" href="#top">ODINA</a>
        <p>Premium cake atelier · Tashkent, Uzbekistan</p>
        <p>© 2026 Odina</p>
      </footer>
    </main>
  )
}
