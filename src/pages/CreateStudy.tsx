import { Stack, Group, Box } from '@mantine/core';
import {
  Title,
  Text,
  Button,
  TextInput,
  Textarea,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  Alert,
} from '@datavant/dart';
import { useState } from 'react';

interface FormData {
  studyName: string;
  description: string;
  studyType: string;
  startDate: Date | null;
  priority: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  studyName?: string;
  description?: string;
  studyType?: string;
  startDate?: string;
  priority?: string;
  agreeToTerms?: string;
}

export function CreateStudy() {
  const [formData, setFormData] = useState<FormData>({
    studyName: '',
    description: '',
    studyType: '',
    startDate: null,
    priority: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.studyName.trim()) {
      newErrors.studyName = 'Study name is required';
    } else if (formData.studyName.length < 3) {
      newErrors.studyName = 'Study name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.studyType) {
      newErrors.studyType = 'Please select a study type';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.priority) {
      newErrors.priority = 'Please select a priority level';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        studyName: '',
        description: '',
        studyType: '',
        startDate: null,
        priority: '',
        agreeToTerms: false,
      });
      setErrors({});
    }
  };

  return (
    <Box p="xl" style={{ width: '100%' }}>
      <Stack gap="xl" style={{ width: '100%' }}>
        <Box>
          <Title order={1} mb="xs">
            Create New Study
          </Title>
          <Text size="lg" c="dimmed">
            Set up a new research study to begin data discovery and analysis
          </Text>
        </Box>

        {submitSuccess && (
          <Alert status="positive" title="Success">
            Study created successfully! You can now begin data discovery.
          </Alert>
        )}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Stack gap="lg" style={{ width: '100%' }}>
            {/* Text Input */}
            <TextInput
              label="Study Name"
              placeholder="e.g., GLP-1 Cardiovascular Safety Study"
              required
              value={formData.studyName}
              onChange={(e) => setFormData({ ...formData, studyName: e.target.value })}
              error={errors.studyName}
              description="A descriptive name for your study"
            />

            {/* Textarea */}
            <Textarea
              label="Study Description"
              placeholder="Describe the research objectives, population, and outcomes of interest..."
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              error={errors.description}
              description="Provide a detailed description of your study"
              minRows={4}
              maxLength={500}
              showCharacterCount={true}
            />

            {/* Select Dropdown */}
            <Select
              label="Study Type"
              placeholder="Select study type"
              required
              data={[
                { value: 'safety', label: 'Post-Market Safety Surveillance' },
                { value: 'effectiveness', label: 'Real-World Effectiveness' },
                { value: 'heor', label: 'Health Economics & Outcomes Research' },
                { value: 'epidemiology', label: 'Epidemiological Study' },
                { value: 'registry', label: 'Patient Registry' },
              ]}
              value={formData.studyType}
              onChange={(value) => setFormData({ ...formData, studyType: value || '' })}
              error={errors.studyType}
              searchable
              clearable
            />

            {/* Date Picker */}
            <DatePicker
              label="Study Start Date"
              placeholder="Select start date"
              required
              value={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              error={errors.startDate}
              description="When do you plan to begin this study?"
            />

            {/* Radio Group */}
            <Box>
              <Text size="sm" fw={500} mb="xs">
                Priority Level <span style={{ color: 'var(--mantine-color-red-6)' }}>*</span>
              </Text>
              <Radio.Group
                value={formData.priority}
                onChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <Stack gap="sm">
                  <Radio value="high" label="High - Regulatory deadline" aria-label="High priority" />
                  <Radio value="medium" label="Medium - Standard timeline" aria-label="Medium priority" />
                  <Radio value="low" label="Low - Exploratory research" aria-label="Low priority" />
                </Stack>
              </Radio.Group>
              {errors.priority && (
                <Text size="sm" c="red" mt="xs">
                  {errors.priority}
                </Text>
              )}
            </Box>

            {/* Checkbox */}
            <Box>
              <Checkbox
                label="I agree to the data use terms and privacy policies"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              />
              {errors.agreeToTerms && (
                <Text size="sm" c="red" mt="xs">
                  {errors.agreeToTerms}
                </Text>
              )}
            </Box>

            {/* Submit Buttons */}
            <Group gap="md" mt="lg">
              <Button intent="prominent" appearance="solid" type="submit">
                Create Study
              </Button>
              <Button
                intent="neutral"
                appearance="outline"
                type="button"
                onClick={() => {
                  setFormData({
                    studyName: '',
                    description: '',
                    studyType: '',
                    startDate: null,
                    priority: '',
                    agreeToTerms: false,
                  });
                  setErrors({});
                  setSubmitSuccess(false);
                }}
              >
                Clear Form
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
