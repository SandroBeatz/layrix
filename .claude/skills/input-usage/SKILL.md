---
name: input-usage
description: Complete guide for using the Input component in forms and UI. Covers all input types, validation, FieldControl wrapper, icons, and best practices. Use when creating forms or adding input fields.
user-invocable: true
allowed-tools: Read, Edit, Grep, Glob
argument-hint: [input-type or feature]
---

# Input Component Usage Guide

Complete reference for using the `Input` component from `@shared/ui` in the Layrix application.

## Basic Import

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Input, FieldControl } from '@shared/ui'
import { tabMail, tabLock, tabSearch } from 'quasar-extras-svg-icons/tabler-icons-v2'

const email = ref('')
</script>
```

## CRITICAL RULE: Always Use FieldControl Wrapper

**❌ WRONG - Never use Input alone:**
```vue
<Input v-model="email" type="email" placeholder="Enter email" />
```

**✅ CORRECT - Always wrap with FieldControl:**
```vue
<FieldControl label="Email" required>
  <Input v-model="email" type="email" placeholder="Enter email" />
</FieldControl>
```

### Why FieldControl?

- Provides semantic HTML `<label>` with `for` attribute
- Displays required indicator (`*`) when needed
- Ensures accessibility for screen readers
- Consistent label + field layout across the app

## Input Types

### Text Input
```vue
<FieldControl label="Full Name" required>
  <Input v-model="name" type="text" placeholder="Enter your name" />
</FieldControl>
```

### Email Input
```vue
<FieldControl label="Email Address" required>
  <Input 
    v-model="email" 
    type="email" 
    placeholder="email@example.com"
    :icon="tabMail"
  />
</FieldControl>
```

### Password Input
```vue
<FieldControl label="Password" required>
  <Input 
    v-model="password" 
    type="password"
    toggle-password
    :icon="tabLock"
    placeholder="Enter password"
  />
</FieldControl>
```

**Note:** Always use `toggle-password` prop for password fields to allow users to see their input.

### Search Input
```vue
<FieldControl label="Search">
  <Input 
    v-model="search" 
    type="search"
    clearable
    :icon="tabSearch"
    placeholder="Search..."
  />
</FieldControl>
```

### Number Input
```vue
<FieldControl label="Age">
  <Input 
    v-model="age" 
    type="number"
    placeholder="Enter your age"
  />
</FieldControl>
```

### Phone Input with Mask
```vue
<FieldControl label="Phone Number">
  <Input 
    v-model="phone" 
    type="tel"
    mask="(###) ### - ####"
    fill-mask
    placeholder="(---) --- ----"
  />
</FieldControl>
```

### Date Input
```vue
<FieldControl label="Birth Date">
  <Input 
    v-model="birthDate" 
    type="date"
  />
</FieldControl>
```

### URL Input
```vue
<FieldControl label="Website">
  <Input 
    v-model="website" 
    type="url"
    placeholder="https://example.com"
  />
</FieldControl>
```

## Textarea Mode

### Basic Textarea
```vue
<FieldControl label="Description">
  <Input 
    v-model="description" 
    textarea
    :rows="4"
    placeholder="Enter description..."
  />
</FieldControl>
```

### Autogrow Textarea
```vue
<FieldControl label="Bio">
  <Input 
    v-model="bio" 
    textarea
    autogrow
    placeholder="Tell us about yourself..."
  />
</FieldControl>
```

**When to use autogrow:**
- User input can vary significantly in length
- You want the field to expand as the user types
- Space is limited and you want to save vertical space initially

## Size Variants

```vue
<!-- Small (36px height) -->
<FieldControl label="Small Input">
  <Input v-model="value" size="sm" placeholder="Small" />
</FieldControl>

<!-- Medium (46px height) - DEFAULT -->
<FieldControl label="Medium Input">
  <Input v-model="value" size="md" placeholder="Medium" />
</FieldControl>

<!-- Large (56px height) -->
<FieldControl label="Large Input">
  <Input v-model="value" size="lg" placeholder="Large" />
</FieldControl>
```

**Default:** `md` (medium)

## Icons

### Prepend Icon (Inside Border, Left Side)
```vue
<FieldControl label="Email">
  <Input 
    v-model="email" 
    :icon="tabMail"
    placeholder="email@example.com"
  />
</FieldControl>
```

### Custom Prepend Slot
```vue
<FieldControl label="Phone">
  <Input v-model="phone" placeholder="Enter number">
    <template #prepend>
      <Typography variant="body">+996</Typography>
    </template>
  </Input>
</FieldControl>
```

### Append Slot (Inside Border, Right Side)
```vue
<FieldControl label="Amount">
  <Input v-model="amount" type="number">
    <template #append>
      <Typography variant="body">USD</Typography>
    </template>
  </Input>
</FieldControl>
```

**Note:** Password toggle automatically uses the append slot when `toggle-password` is enabled.

## Before/After Slots (Outside Border)

### Before Slot (Left of Input)
```vue
<FieldControl label="Price">
  <Input v-model="price" placeholder="0.00">
    <template #before>
      <Typography variant="body">$</Typography>
    </template>
  </Input>
</FieldControl>
```

### After Slot (Right of Input)
```vue
<FieldControl label="Weight">
  <Input v-model="weight" placeholder="Enter weight">
    <template #after>
      <Typography variant="body">kg</Typography>
    </template>
  </Input>
</FieldControl>
```

### Combining Before and After
```vue
<FieldControl label="Currency Amount">
  <Input v-model="amount" placeholder="0.00">
    <template #before>
      <Typography variant="body">$</Typography>
    </template>
    <template #after>
      <Typography variant="body">USD</Typography>
    </template>
  </Input>
</FieldControl>
```

**Difference between prepend/append and before/after:**
- `prepend`/`append`: Inside the input border (part of the field visual box)
- `before`/`after`: Outside the input border (separate elements)

## Input States

### Disabled
```vue
<FieldControl label="Username">
  <Input 
    v-model="username" 
    disable
    placeholder="This field is disabled"
  />
</FieldControl>
```

### Readonly
```vue
<FieldControl label="User ID">
  <Input 
    v-model="userId" 
    readonly
    placeholder="This field is readonly"
  />
</FieldControl>
```

**Difference:**
- `disable`: Field is grayed out and non-interactive
- `readonly`: Field is visible with normal styling but not editable

### Clearable
```vue
<FieldControl label="Search">
  <Input 
    v-model="search" 
    clearable
    placeholder="Search..."
  />
</FieldControl>
```

Adds an X button to clear the input value.

## Validation & Error Handling

### Basic Error State
```vue
<script setup lang="ts">
const email = ref('')
const hasError = computed(() => !email.value.includes('@'))
</script>

<template>
  <FieldControl label="Email" required>
    <Input 
      v-model="email"
      type="email"
      :error="hasError"
      placeholder="email@example.com"
    />
  </FieldControl>
</template>
```

### Error with Message
```vue
<FieldControl label="Email" required>
  <Input 
    v-model="email"
    type="email"
    :error="hasError"
    error-message="Please enter a valid email address"
    placeholder="email@example.com"
  />
</FieldControl>
```

### Validation Rules
```vue
<script setup lang="ts">
import type { ValidationRule } from '@shared/ui'

const emailRules: ValidationRule[] = [
  (val) => !!val || 'Email is required',
  (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val)) || 'Invalid email format'
]
</script>

<template>
  <FieldControl label="Email" required>
    <Input 
      v-model="email"
      type="email"
      :rules="emailRules"
      lazy-rules
      placeholder="email@example.com"
    />
  </FieldControl>
</template>
```

**Validation Props:**
- `rules`: Array of validation functions
- `lazy-rules`: Only validate on blur/submit (recommended)
- `reactive-rules`: Validate on every input change

### Hint Text
```vue
<FieldControl label="Password">
  <Input 
    v-model="password"
    type="password"
    hint="Minimum 8 characters, including uppercase and number"
  />
</FieldControl>
```

## Complete Form Example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Input, FieldControl, Button } from '@shared/ui'
import { tabMail, tabLock, tabUser } from 'quasar-extras-svg-icons/tabler-icons-v2'
import type { ValidationRule } from '@shared/ui'

const form = ref({
  name: '',
  email: '',
  password: '',
  bio: '',
  phone: ''
})

const emailRules: ValidationRule[] = [
  (val) => !!val || 'Email is required',
  (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val)) || 'Invalid email'
]

const passwordRules: ValidationRule[] = [
  (val) => !!val || 'Password is required',
  (val) => String(val).length >= 8 || 'Minimum 8 characters'
]

const handleSubmit = () => {
  console.log('Form submitted:', form.value)
}
</script>

<template>
  <div class="column q-gutter-md" style="max-width: 600px">
    <FieldControl label="Full Name" required>
      <Input 
        v-model="form.name"
        type="text"
        :icon="tabUser"
        placeholder="Enter your name"
      />
    </FieldControl>

    <FieldControl label="Email Address" required>
      <Input 
        v-model="form.email"
        type="email"
        :icon="tabMail"
        :rules="emailRules"
        lazy-rules
        placeholder="email@example.com"
      />
    </FieldControl>

    <FieldControl label="Password" required>
      <Input 
        v-model="form.password"
        type="password"
        toggle-password
        :icon="tabLock"
        :rules="passwordRules"
        lazy-rules
        hint="Minimum 8 characters"
        placeholder="Enter password"
      />
    </FieldControl>

    <FieldControl label="Phone Number">
      <Input 
        v-model="form.phone"
        type="tel"
        mask="(###) ### - ####"
        fill-mask
        placeholder="(---) --- ----"
      />
    </FieldControl>

    <FieldControl label="Bio">
      <Input 
        v-model="form.bio"
        textarea
        autogrow
        placeholder="Tell us about yourself..."
      />
    </FieldControl>

    <Button @click="handleSubmit">Submit</Button>
  </div>
</template>
```

## Common Patterns

### Optional Field (No Required Indicator)
```vue
<FieldControl label="Middle Name">
  <Input v-model="middleName" placeholder="Optional" />
</FieldControl>
```

### Search Field with Clear Button
```vue
<FieldControl label="Search">
  <Input 
    v-model="search"
    type="search"
    clearable
    :icon="tabSearch"
    placeholder="Search..."
  />
</FieldControl>
```

### Currency Input
```vue
<FieldControl label="Amount">
  <Input v-model="amount" type="number" placeholder="0.00">
    <template #before>
      <Typography variant="body">$</Typography>
    </template>
    <template #after>
      <Typography variant="body">USD</Typography>
    </template>
  </Input>
</FieldControl>
```

### File Upload
```vue
<FieldControl label="Upload Document">
  <Input 
    v-model="file"
    type="file"
  />
</FieldControl>
```

## Best Practices

### DO ✅

- Always wrap Input with FieldControl
- Use `toggle-password` for password fields
- Use `clearable` for search and optional text inputs
- Use `lazy-rules` for validation (better UX)
- Import icons from `quasar-extras-svg-icons/tabler-icons-v2`
- Use proper input types (email, tel, url, etc.) for better mobile keyboards
- Use `autogrow` for textareas with variable content length
- Use masks for formatted inputs (phone, credit card, etc.)

### DON'T ❌

- Don't use Input without FieldControl wrapper
- Don't use string literals for icons - always import Tabler icons
- Don't use `reactive-rules` unless real-time validation is needed
- Don't forget the `required` prop on FieldControl for required fields
- Don't mix before/after slots with prepend/append for the same purpose
- Don't use `any` type for validation rules

## Props Reference

### Input Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number` | - | v-model binding |
| `type` | `InputType` | `'text'` | Input type (text, email, password, etc.) |
| `placeholder` | `string` | - | Placeholder text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `icon` | `string` | - | Prepend icon (Tabler icon object) |
| `textarea` | `boolean` | `false` | Render as textarea |
| `autogrow` | `boolean` | `false` | Auto-grow textarea height |
| `rows` | `number` | - | Textarea rows (when textarea=true) |
| `togglePassword` | `boolean` | `false` | Show password toggle (type='password' only) |
| `clearable` | `boolean` | `false` | Show clear button |
| `disable` | `boolean` | `false` | Disable input |
| `readonly` | `boolean` | `false` | Make input readonly |
| `error` | `boolean` | `false` | Show error state |
| `errorMessage` | `string` | - | Error message text |
| `hint` | `string` | - | Hint text below input |
| `rules` | `ValidationRule[]` | - | Validation rules |
| `lazyRules` | `boolean \| 'ondemand'` | `false` | Validate on blur |
| `reactiveRules` | `boolean` | `false` | Validate on input |
| `mask` | `string` | - | Input mask pattern |
| `fillMask` | `boolean \| string` | - | Fill mask characters |

### FieldControl Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text |
| `required` | `boolean` | `false` | Show required indicator (*) |
| `id` | `string` | auto | Field ID (auto-generated if not provided) |

## Slots

### Input Slots

| Slot | Location | Purpose |
|------|----------|---------|
| `before` | Outside border, left | Content before input |
| `prepend` | Inside border, left | Content at start of input |
| `default` | Inside input | Custom input content |
| `append` | Inside border, right | Content at end of input |
| `after` | Outside border, right | Content after input |

### FieldControl Slots

| Slot | Purpose |
|------|---------|
| `default` | Form control (Input, Select, etc.) |

## See Also

- Live examples: `/inputs` page (InputsPage.vue)
- Component source: `src/shared/ui/primitives/Input/`
- FieldControl source: `src/shared/ui/primitives/FieldControl/`
- Icons skill: Use `/icons` skill for finding Tabler icons
