import { Injectable, Inject } from '@nestjs/common';
import { 
  VisaWizardInput, 
  VisaPathOption,
  ChecklistItem,
  VisaApplication
} from '@nomad-life/contracts';
import { rulesLoader } from '@nomad-life/rules';

@Injectable()
export class ImmigrationService {
  constructor(
    @Inject('RULES_LOADER') private readonly rules: typeof rulesLoader
  ) {}

  async findVisaPaths(input: VisaWizardInput): Promise<VisaPathOption[]> {
    const { nationality, destination, purpose, stayLengthDays } = input;
    
    const paths = await this.rules.findVisaPaths(
      nationality,
      destination,
      purpose,
      stayLengthDays
    );

    return paths.map(path => ({
      id: path.id,
      name: path.name,
      type: path.type,
      confidence: path.confidence,
      stayLimitDays: path.stayLimitDays,
      extensionsPossible: path.extensionsPossible,
      extensionLimitDays: path.extensionLimitDays,
      estimatedApprovalRate: path.estimatedApprovalRate,
      requirements: path.requirements,
      documentsRequired: path.documentsRequired,
      estimatedProcessingTimeDays: path.estimatedProcessingTimeDays,
      governmentFees: path.governmentFees,
      serviceFees: path.serviceFees,
      notes: path.notes
    }));
  }

  async generateChecklist(pathId: string, input: VisaWizardInput): Promise<ChecklistItem[]> {
    const paths = await this.findVisaPaths(input);
    const selectedPath = paths.find(p => p.id === pathId);
    
    if (!selectedPath) {
      throw new Error(`Visa path ${pathId} not found`);
    }

    const checklist: ChecklistItem[] = [];

    // Add document requirements
    selectedPath.documentsRequired?.forEach((doc, index) => {
      checklist.push({
        id: `doc-${index}`,
        title: `Prepare ${doc}`,
        description: `Required document: ${doc}`,
        completed: false,
        priority: 'high',
        estimatedTimeMinutes: 60
      });
    });

    // Add application steps
    checklist.push({
      id: 'apply',
      title: 'Submit visa application',
      description: 'Complete and submit the visa application form',
      completed: false,
      priority: 'high',
      estimatedTimeMinutes: 120
    });

    // Add post-arrival tasks
    checklist.push({
      id: 'arrival-report',
      title: 'Complete arrival reporting (TM30)',
      description: 'Complete arrival reporting within 24 hours of arrival',
      completed: false,
      priority: 'medium',
      estimatedTimeMinutes: 30,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    });

    return checklist;
  }

  async createVisaApplication(
    pathId: string, 
    input: VisaWizardInput,
    userId: string
  ): Promise<VisaApplication> {
    const checklist = await this.generateChecklist(pathId, input);
    
    return {
      id: `visa-${Date.now()}`,
      userId,
      visaPathId: pathId,
      status: 'draft',
      checklist,
      documents: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
