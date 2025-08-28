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
      stayLimit: path.stayLimit,
      requirements: path.requirements,
      documents: path.documents,
      processingTime: path.processingTime,
      fees: path.fees,
      confidence: path.confidence,
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
    selectedPath.documents?.forEach((doc, index) => {
      checklist.push({
        id: `doc-${index}`,
        title: `Prepare ${doc.description}`,
        category: 'documents',
        dueDate: null,
        completed: false,
        priority: doc.optional ? 'low' : 'high'
      });
    });

    // Add application steps
    checklist.push({
      id: 'apply',
      title: 'Submit visa application',
      category: 'application',
      dueDate: null,
      completed: false,
      priority: 'high'
    });

    // Add post-arrival tasks
    checklist.push({
      id: 'arrival-report',
      title: 'Complete arrival reporting (TM30)',
      category: 'post-arrival',
      dueDate: 'arrival+24h',
      completed: false,
      priority: 'medium'
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
      pathId,
      status: 'draft',
      nationality: input.nationality,
      destination: input.destination,
      purpose: input.purpose,
      stayLengthDays: input.stayLengthDays,
      checklist,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
