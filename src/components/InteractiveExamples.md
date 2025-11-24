# Interactive Learning Components Usage Guide

This guide shows how to use the interactive learning components in your documentation.

## 1. Interactive Code Editor

Use the `InteractiveCodeEditor` component for live code editing and execution:

```tsx
import InteractiveCodeEditor from './components/InteractiveCodeEditor';

<InteractiveCodeEditor
  code={`console.log('Hello, World!');`}
  language="javascript"
  title="JavaScript Example"
  description="Try editing and running this code"
  editable={true}
  height="300px"
/>
```

## 2. Step-by-Step Guide

Use the `StepByStepGuide` component for interactive walkthroughs:

```tsx
import StepByStepGuide from './components/StepByStepGuide';

<StepByStepGuide
  title="Getting Started with Cost Katana"
  steps={[
    {
      title: "Installation",
      description: "Install the Cost Katana SDK",
      content: <p>Run: npm install cost-katana</p>,
      code: "npm install cost-katana"
    },
    {
      title: "Configuration",
      description: "Set up your API key",
      content: <p>Add your API key to the configuration</p>
    }
  ]}
  onComplete={() => console.log('Guide completed!')}
/>
```

## 3. Video Tutorial

Use the `VideoTutorial` component for embedded videos with synchronized highlighting:

```tsx
import VideoTutorial from './components/VideoTutorial';

<VideoTutorial
  videoUrl="https://example.com/video.mp4"
  title="Cost Katana Tutorial"
  description="Learn how to use Cost Katana"
  highlights={[
    { time: 10, text: "API Key Setup", elementId: "api-key-section" },
    { time: 30, text: "First Request", elementId: "first-request" }
  ]}
  transcript={[
    { time: 0, text: "Welcome to Cost Katana..." },
    { time: 10, text: "First, let's set up your API key..." }
  ]}
/>
```

## 4. Smart Code Copy

Use the `SmartCodeCopy` component for code blocks with context:

```tsx
import SmartCodeCopy from './components/SmartCodeCopy';

<SmartCodeCopy
  code={`const client = new CostKatanaClient({ apiKey: 'your-key' });`}
  language="typescript"
  context={{
    imports: [
      "import { CostKatanaClient } from 'cost-katana';"
    ],
    dependencies: ['cost-katana'],
    description: "Initialize the Cost Katana client with your API key"
  }}
/>
```

## 5. API Tester

Use the `APITester` component for live API testing:

```tsx
import APITester from './components/APITester';

<APITester
  title="Test API Endpoint"
  description="Try out the Cost Katana API"
  baseUrl="https://api.costkatana.com"
  endpoint={{
    method: 'POST',
    path: '/v1/usage',
    description: "Track API usage",
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: {
      project: 'my-project',
      tokens: 1000
    },
    exampleResponse: {
      success: true,
      usage: { tokens: 1000 }
    }
  }}
/>
```

