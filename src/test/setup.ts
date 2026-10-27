import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { useOrderStore } from '../store/orderStore.ts'

beforeEach(() => {
  useOrderStore.setState(useOrderStore.getInitialState(), true)
})

afterEach(() => cleanup())
