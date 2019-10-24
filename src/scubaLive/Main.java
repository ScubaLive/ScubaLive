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
	        System.out.println ( "1. Add a Dive" ) ;
	        System.out.println ( "2. Edit a Dive" );
	        System.out.println ( "3. Print a Dive" ) ;
	        System.out.println ( "4. Change the Number of Dives" ) ;
	        System.out.println ( "5. Print Plan" ) ;
//	        for(int i = 5; i < plan1.getNum() + 5; i++) {
//	        	System.out.println("" + i + ". Modify Dive " + (i-4));
//	        }
	        System.out.println ( "6. Exit the program");
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
//	        	    System.out.println("Please the corresponding action!");
	        	    while (!input.hasNextInt()) {
	        	        System.out.println("Error, Enter a Positive Integer");
	        	        input.next();
	        	    }
	        	    entered = input.nextInt();
	        	} while (entered <= 0);
	        	bottomTime = entered;
	            System.out.println("Enter the Maximum Dive Depth (meters): ");
//	            entered = input.nextInt();
//	            while (entered <= 0 | entered > 40){
//	     	       System.out.println("Error, Enter a Number Between 0 and 40");
//	     	       entered = input.nextInt();
//	            }
//	            do {
//	        	    System.out.println("Enter the Maximum Dive Depth (meters): ");
//	        	    while (!input.hasNextInt()) {
//	        	        System.out.println("Error, Enter a Number Between 0 and 40");
//	        	        input.next();
//	        	    }
//	        	    entered = input.nextInt();
//	        	} while (entered < 0 | entered > 40);
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
//	        	    System.out.println("Please the corresponding action!");
	        	    while (!input.hasNextInt()) {
	        	        System.out.println("Error, Enter a Positive Integer");
	        	        input.next();
	        	    }
	        	    entered = input.nextInt();
	        	} while (entered <= 0);
	        	bottomTime = entered;
	            do {
	        	    System.out.println("Enter the Maximum Dive Depth (meters): ");
	        	    while (!input.hasNextInt()) {
	        	        System.out.println("Error, Enter a Number Between 0 and 40");
	        	        input.next();
	        	    }
	        	    entered = input.nextInt();
	        	} while (entered < 0 | entered > 40);
	            diveDepth = entered;
	            plan1.updateDive(diveNum, bottomTime, diveDepth);
	            break;
	        	
	        case 3:
	        	System.out.println("Select Which Dive to Plan");
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
	            	System.out.println("Error, Enter a Number Between 0 and 40");
	            }
	        } else {
	        	System.out.println("Error, Enter a Valid Number");
	            in.next();
	        }
	    }
	    return -1;
	}
}

