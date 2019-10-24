package scubaLive;

import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		
		Scanner input = new Scanner(System.in);
		DiveTable divetable = new DiveTable();
		SurfaceTable surftable = new SurfaceTable();
		Plan plan1 = new Plan(divetable, surftable);
		int Choice;
		boolean run = true;
		
		System.out.println("---------------------WARNING--------------------");
		System.out.println("*THIS IS A PROTOTYPE DO NOT USE FOR REAL DIVES!*");
		System.out.println("---------------PROCEED W/ CAUTION---------------\n");

		while(run) {
			System.out.println("-----------------------------------------");
			System.out.println("Current number of Dives: " + plan1.getNum());
	        System.out.println("1. Add a Dive");
	        System.out.println("2. Edit a Dive");
	        System.out.println("3. Print a Dive");
	        System.out.println("4. Change the Number of Dives");
	        System.out.println("5. Print Plan");
	        System.out.println("6. Edit Surface Interval Time Between Dives");
	        System.out.println ("7. Exit the program");
	        System.out.println("-----------------------------------------");
	        System.out.println ( "\nEnter the number to the corresponding action you want to perform:" );
	        Choice = input.nextInt();
	        
	        switch(Choice) {
	        case 1 :
	        	int bottomTime;
	        	int diveDepth;
	        	int entered;
	        	
	        	if(plan1.getNum() == 3) {
	        		System.out.println("Error");
	        	} else {
	        		plan1.updateNum(plan1.getNum() + 1);
	        	}
	        	
	        	System.out.println("Enter the Bottom Time (minutes):\n");
	        	do {
	        	    while (!input.hasNextInt()) {
	        	        System.out.println("Error, Enter a Positive Integer");
	        	        input.next();
	        	    }
	        	    entered = input.nextInt();
	        	} while (entered <= 0);
	        	bottomTime = entered;
	            System.out.println("Enter the Maximum Dive Depth (meters): ");
	            diveDepth = getInputInt(input, 40);
	            plan1.updateDive(plan1.getNum(), bottomTime, diveDepth);
	            System.out.println(plan1.toString());
	            break;
	            
	        case 2:
	        	int diveNum;
	        	System.out.println("Select Which Dive to Edit");
	        	for(int i = 0; i < plan1.getNum(); i++) {
		        	System.out.println((i+1) + ". Dive " + (i+1));
		        }
	        	do {
	        	    System.out.println("Please Enter the Corresponding Number");
	        	    while (!input.hasNextInt()) {
	        	        System.out.println("Error, Enter a Valid Number");
	        	        input.next();
	        	    }
	        	    entered = input.nextInt();
	        	} while (entered <= 0 & entered >= plan1.getNum());
	        	diveNum = entered;
	        	System.out.println("Enter the Bottom Time (minutes):");
	        	do {
	        	    while (!input.hasNextInt()) {
	        	        System.out.println("Error, Enter a Positive Integer");
	        	        input.next();
	        	    }
	        	    entered = input.nextInt();
	        	} while (entered <= 0);
	        	bottomTime = entered;
	        	System.out.println("Enter the Maximum Dive Depth (meters): ");
	            diveDepth = getInputInt(input, 40);
	            plan1.updateDive(diveNum, bottomTime, diveDepth);
	            break;
	        	
	        case 3:
	        	System.out.println("Select Which Dive to Print");
	        	for(int i = 0; i < plan1.getNum(); i++) {
		        	System.out.println((i+1) + ". Dive " + (i+1));
		        }
	        	do {
	        	    System.out.println("Please Enter the Corresponding Number");
	        	    while (!input.hasNextInt()) {
	        	        System.out.println("Error, Enter a Valid Number");
	        	        input.next();
	        	    }
	        	    entered = input.nextInt();
	        	} while (entered <= 0 & entered >= plan1.getNum());
	        	System.out.println(plan1.diveString(entered));
	        	break;
	        	
	        case 4:
	        	do {
	        	    System.out.println("Please Enter the Number of Dives you Want for this Plan (up to 3)");
	        	    while (!input.hasNextInt()) {
	        	        System.out.println("Error, Enter a Valid Number");
	        	        input.next();
	        	    }
	        	    entered = input.nextInt();
	        	} while (entered < 0 & entered > 3); 
	        	plan1.updateNum(entered);
	        	break;
	        	
	        case 5:
	        	System.out.println(plan1.toString());
	        	break;
	        	
	        case 6:
	        	if(plan1.getNum() == 2) {
	        		System.out.println("--------Surface Interval Time Between Dive 1 and 2--------");
		        	System.out.println("Enter a Surface Interval Time (minutes): ");
		        	do {
		        	    while (!input.hasNextInt()) {
		        	        System.out.println("Error, Enter a Positive Integer");
		        	        input.next();
		        	    }
		        	    entered = input.nextInt();
		        	} while (entered <= 0);
		        	plan1.si1.updateInterval(entered);
		        } else if (plan1.getNum() == 3) {
		        	System.out.println("1. Edit Surface Interval Time Between Dive 1 and 2");
		        	System.out.println("2. Edit Surface Interval Time Between Dive 2 and 3");
		        	do {
		        	    System.out.println("Please Enter the Corresponding Number");
		        	    while (!input.hasNextInt()) {
		        	        System.out.println("Error, Enter a Valid Number");
		        	        input.next();
		        	    }
		        	    entered = input.nextInt();
		        	} while (entered <= 0 & entered >= 3);
		        	if(entered == 1) {
		        		System.out.println("--------Surface Interval Time Between Dive 1 and 2--------");
			        	System.out.println("Enter a Surface Interval Time (minutes): ");
			        	do {
			        	    while (!input.hasNextInt()) {
			        	        System.out.println("Error, Enter a Positive Integer");
			        	        input.next();
			        	    }
			        	    entered = input.nextInt();
			        	} while (entered <= 0);
			        	plan1.si1.updateInterval(entered);
		        	} else if(entered == 2) {
		        		System.out.println("--------Surface Interval Time Between Dive 2 and 3--------");
			        	System.out.println("Enter a Surface Interval Time (minutes): ");
			        	do {
			        	    while (!input.hasNextInt()) {
			        	        System.out.println("Error, Enter a Positive Integer");
			        	        input.next();
			        	    }
			        	    entered = input.nextInt();
			        	} while (entered <= 0);
			        	plan1.si2.updateInterval(entered);
		        	} else {
		        		System.out.println("You did not enter a valid option. Try agian");
		        	}
		        } else {
		        	System.out.println("You need more than 1 dive");
		        }
	        	break;
	        	
	        case 7:
	        	System.out.println("--------------------REMINDER--------------------");
	        	System.out.println("*THIS IS A PROTOTYPE DO NOT USE FOR REAL DIVES!*");
	        	System.out.println("--------------------THANK YOU-------------------");
	        	run = false;
	        	break;
	        }
	        
		}
		
	}
	
	public static int getInputInt(Scanner in, int range) {
	    while (in.hasNext()) {
	        if (in.hasNextInt()) {
	            int val = in.nextInt();
	            if (val >= 0 && val < range) { // <-- from "0" to "range".
	                return val;
	            } else {
	            	System.out.println("Error, Enter a Number Between 0 and " + range);
	            }
	        } else {
	        	System.out.println("Error, Enter a Valid Number");
	            in.next();
	        }
	    }
	    return -1;
	}
}

